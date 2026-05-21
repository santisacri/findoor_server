import { IFavoriteRepository } from "../../../domain/contracts/repositories/favorite.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IToggleFavoriteUseCase {
    execute(propertyId: string, userId: string): Promise<{ isFavorite: boolean }>
}

export class ToggleFavoriteUseCase implements IToggleFavoriteUseCase {

    constructor(
        private readonly favoriteRepo: IFavoriteRepository,
        private readonly propertyRepo: IPropertyRepository
    ) { }

    async execute(propertyId: string, userId: string): Promise<{ isFavorite: boolean; }> {
        const property = await this.propertyRepo.getProperty(propertyId)

        if(property.ownerId === userId) throw CustomError.forbidden('Cannot add to favorites your own property')

        const isFavorite = await this.favoriteRepo.toggleFavorite(propertyId, userId)
        return { isFavorite }
    }

}