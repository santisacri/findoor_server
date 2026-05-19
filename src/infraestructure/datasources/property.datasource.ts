import { PrismaClient, Property } from "../../../generated/prisma/client";
import { IPropertyDatasource } from "../../domain/contracts/datasources/property.datasource.interface";
import { Currency, OperationType, PropertyEntity, PropertyType } from "../../domain/entities/property.entity";
import { CustomError } from "../../domain/errors/custom-errors";
import { TCreateProperty } from "../../presentation/property/property.schemas";



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

    async getAllProperties(userId: string): Promise<PropertyEntity[]> {
        throw new Error("Method not implemented.");
    }

    async getProperty(userId: string, propertyId: string): Promise<PropertyEntity> {
        throw new Error("Method not implemented.");
    }

}