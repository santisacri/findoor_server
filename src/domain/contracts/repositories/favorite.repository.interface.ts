import { FavoriteEntity } from "../../entities/favorite.entity";


export interface IFavoriteRepository {
    toggleFavorite(propertyId: string, userId: string): Promise<boolean>
    getFavorites(userId: string): Promise<FavoriteEntity[]>
}