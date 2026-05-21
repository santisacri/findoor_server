import { GetUserFavoritesUseCase } from "../application/use-cases/favorite/get-user-favorites.use-case"
import { ToggleFavoriteUseCase } from "../application/use-cases/favorite/toggle-favorite.use-case"
import { FavoriteController } from "../presentation/property/favorite.controller"
import { favoriteRepository, propertyRepository } from "./repositories.container"

const toggleFavoriteUseCase = new ToggleFavoriteUseCase(favoriteRepository, propertyRepository)
const getUserFavoritesUseCase = new GetUserFavoritesUseCase(favoriteRepository)

export const favoriteController = new FavoriteController({ toggleFavoriteUseCase, getUserFavoritesUseCase })