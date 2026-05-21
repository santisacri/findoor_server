import { IFavoriteDatasource } from "../../domain/contracts/datasources/favorite.datasource.interface";
import { IFavoriteRepository } from "../../domain/contracts/repositories/favorite.repository.interface";
import { FavoriteEntity } from "../../domain/entities/favorite.entity";


export class FavoriteRepository implements IFavoriteRepository {

    constructor(
        private readonly favoriteDatasource: IFavoriteDatasource,
    ) { }

    async toggleFavorite(propertyId: string, userId: string): Promise<boolean> {
        const record = await this.favoriteDatasource.getFavorite(propertyId, userId)

        if (record) {
            await this.favoriteDatasource.deleteFavorite(record.id)
            return false
        }

        await this.favoriteDatasource.createFavorite(propertyId, userId)

        return true
    }


    getFavorites(userId: string): Promise<FavoriteEntity[]> {
        return this.favoriteDatasource.getAllFavoritesByUser(userId)
    }

}