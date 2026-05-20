import { PrismaClient } from "../../../generated/prisma/client";
import { IPhotoDatasurce } from "../../domain/contracts/datasources/photo.datasource.interface";
import { PhotoEntity } from "../../domain/entities/photo.entity";
import { CustomError } from "../../domain/errors/custom-errors";

export class PhotoDatasource implements IPhotoDatasurce {
    constructor(private prisma: PrismaClient) { }

    async createMany(photos: { url: string; publicId: string; propertyId: string; order: number }[]): Promise<PhotoEntity[]> {
        try {
            const records = await this.prisma.photo.createManyAndReturn({ data: photos })
            return records.map(PhotoEntity.fromObject)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async delete(photoId: string): Promise<void> {
        try {
            await this.prisma.photo.delete({ where: { id: photoId } })
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async findByPropertyId(propertyId: string): Promise<PhotoEntity[]> {
        try {
            const records = await this.prisma.photo.findMany({
                where: { propertyId },
                orderBy: { order: 'asc' }
            })
            return records.map(PhotoEntity.fromObject)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async findById(photoId: string): Promise<PhotoEntity> {
        try {
            const record = await this.prisma.photo.findUniqueOrThrow({
                where: { id: photoId }
            })

            return PhotoEntity.fromObject(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }
}