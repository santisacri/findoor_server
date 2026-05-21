import { FavoriteEntity } from "../../entities/favorite.entity";


export interface IFavoriteDatasource {
    createFavorite(propertyId: string, userId: string): Promise<FavoriteEntity>
    deleteFavorite(id: string): Promise<null>
    getFavorite(propertyId: string, userId: string): Promise<FavoriteEntity | null>
    getAllFavoritesByUser(userId: string): Promise<FavoriteEntity[]>
}