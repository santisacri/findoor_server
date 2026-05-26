import { PrismaClient, Property } from "../../../generated/prisma/client";
import { IPropertyDatasource } from "../../domain/contracts/datasources/property.datasource.interface";
import { Currency, OperationType, PropertyEntity, PropertyType } from "../../domain/entities/property.entity";
import { CustomError } from "../../domain/errors/custom-errors";
import { TCreateProperty, TGetProperties, TUpdateProperty } from "../../presentation/property/property.schemas";
import { createWhereClause } from "../helpers";



export class PropertyDatasource implements IPropertyDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }


    private toEntity(record: Property): PropertyEntity {
        const { currency, operationType, propertyType, ...rest } = record
        return PropertyEntity.fromObject({
            ...rest,
            currency: currency as unknown as Currency,
            operationType: operationType as unknown as OperationType,
            propertyType: propertyType as unknown as PropertyType,
        })
    }

    async create(data: TCreateProperty, userId: string): Promise<PropertyEntity> {
        try {
            const { address, ...propertyData } = data

            const record = await this.prisma.property.create({
                data: {
                    ownerId: userId,
                    ...propertyData,
                    address: { create: address },
                },
                include: { address: true }
            })

            return this.toEntity(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async getAllProperties(filters: TGetProperties): Promise<{ properties: PropertyEntity[], total: number }> {
        const where = createWhereClause(filters)

        const [properties, total] = await this.prisma.$transaction([
            this.prisma.property.findMany({
                where,
                skip: (filters.page - 1) * 25,
                take: 25,
                include: { address: true, photos: { take: 1, orderBy: { order: 'asc' } } }
            }),
            this.prisma.property.count({ where })
        ])

        return {
            properties: properties.map(this.toEntity),
            total
        }
    }

    async getOwnerProperties(userId: string): Promise<PropertyEntity[]> {
        try {
            const properties = await this.prisma.property.findMany({
                where: { ownerId: userId },
                include: {
                    address: true,
                    photos: { orderBy: { order: 'asc' }, take: 1 },
                }
            })

            return properties.map(this.toEntity)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getProperty(propertyId: string): Promise<PropertyEntity> {
        try {
            const property = await this.prisma.property.findUniqueOrThrow({
                where: { id: propertyId },
                include: {
                    address: true,
                    photos: { orderBy: { order: 'asc' } }
                }
            })

            return this.toEntity(property)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async countByOwner(ownerId: string): Promise<number> {
        const count = await this.prisma.property.count({
            where: { ownerId }
        })

        return count
    }

    async update(data: TUpdateProperty, propertyId: string): Promise<PropertyEntity> {
        const { address, ...propertyData } = data!
        try {
            const property = await this.prisma.property.update({
                where: { id: propertyId },
                include: { address: true },
                data: {
                    ...propertyData,
                    address: {
                        update: address
                    }
                }
            })

            return this.toEntity(property)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async toggleStatus(status: boolean, propertyId: string): Promise<PropertyEntity> {
        try {
            const property = await this.prisma.property.update({
                where: { id: propertyId },
                include: { address: true },
                data: {
                    isActive: status
                }
            })

            return this.toEntity(property)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async delete(propertyId: string): Promise<PropertyEntity> {
        try {
            const property = await this.prisma.property.delete({
                where: { id: propertyId },
                include: { address: true }
            })

            return this.toEntity(property)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

}