import { IFavoriteRepository } from "../../../domain/contracts/repositories/favorite.repository.interface";
import { FavoriteEntity } from "../../../domain/entities/favorite.entity";

export interface IGetUserFavoritesUseCase {
    execute(userId: string): Promise<FavoriteEntity[]>
}

export class GetUserFavoritesUseCase implements IGetUserFavoritesUseCase {

    constructor(
        private readonly favoriteRepo: IFavoriteRepository
    ) { }

    
    execute(userId: string): Promise<FavoriteEntity[]> {
        return this.favoriteRepo.getFavorites(userId)
    }

}