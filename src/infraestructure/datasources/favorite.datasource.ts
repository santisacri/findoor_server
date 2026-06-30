import { PrismaClient } from "../../../generated/prisma/client"
import { IFavoriteDatasource } from "../../domain/contracts/datasources/favorite.datasource.interface";
import { FavoriteEntity } from "../../domain/entities/favorite.entity";
import { CustomError } from "../../domain/errors/custom-errors";


export class FavoriteDatasource implements IFavoriteDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async createFavorite(propertyId: string, userId: string): Promise<FavoriteEntity> {
        try {
            const record = await this.prisma.favorite.create({
                data: { propertyId, userId }
            })

            return FavoriteEntity.fromObject(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async deleteFavorite(id: string): Promise<null> {
        try {
            await this.prisma.favorite.delete({
                where: { id }
            })

            return null
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getAllFavoritesByUser(userId: string): Promise<FavoriteEntity[]> {
        try {
            const favorites = await this.prisma.favorite.findMany({
                where: { userId }
            })

            return favorites.map(FavoriteEntity.fromObject)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getFavorite(propertyId: string, userId: string): Promise<FavoriteEntity | null> {
        try {
            const favorite = await this.prisma.favorite.findFirst({
                where: { userId, propertyId }
            })

            if (!favorite) return null

            return FavoriteEntity.fromObject(favorite)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }
}