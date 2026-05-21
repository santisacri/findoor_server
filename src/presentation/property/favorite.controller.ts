import { NextFunction, Request, Response } from "express";
import { ICreatePropertyUseCase } from "../../application/use-cases/property/create-property.use-case";
import { IGetAllPropertiesUseCase } from "../../application/use-cases/property/get-all-properties.use-case";
import { IGetPropertyUseCase } from "../../application/use-cases/property/get-property.use-case";
import { IUpdatePropertyUseCase } from "../../application/use-cases/photo/update-property.use-case";
import { IDeletePropertyUseCase } from "../../application/use-cases/property/delete-property.use-case";
import { IToggleFavoriteUseCase } from "../../application/use-cases/favorite/toggle-favorite.use-case";
import { IGetUserFavoritesUseCase } from "../../application/use-cases/favorite/get-user-favorites.use-case";

interface UseCases {
    toggleFavoriteUseCase: IToggleFavoriteUseCase,
    getUserFavoritesUseCase: IGetUserFavoritesUseCase
}

export class FavoriteController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    toggleFavorite = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        const { propertyId } = req.params
        try {
            const result = await this.useCases.toggleFavoriteUseCase.execute(propertyId as string, id)

            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    getFavorites = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        try {
            const favorites = await this.useCases.getUserFavoritesUseCase.execute(id)
            res.json({ favorites: favorites })
        } catch (error) {
            next(error)
        }
    }

}