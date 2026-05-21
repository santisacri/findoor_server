import { CreatePropertyUseCase } from "../application/use-cases/property/create-property.use-case";
import { DeletePhotoUseCase } from "../application/use-cases/property/delete-photo.use-case";
import { DeletePropertyUseCase } from "../application/use-cases/property/delete-property.use-case";
import { GetAllPropertiesUseCase } from "../application/use-cases/property/get-all-properties.use-case";
import { GetPropertyUseCase } from "../application/use-cases/property/get-property.use-case";
import { ToggleStatusUseCase } from "../application/use-cases/property/toggle-status.use-case";
import { UpdatePropertyUseCase } from "../application/use-cases/photo/update-property.use-case";
import { UploadPhotosUseCase } from "../application/use-cases/photo/upload-photos.use-case";
import { PropertyController } from "../presentation/property/property.controller";
import { favoriteRepository, photoRepository, propertyRepository } from "./repositories.container";
import { cloudinaryService } from "./services.container";
import { ToggleFavoriteUseCase } from "../application/use-cases/favorite/toggle-favorite.use-case";
import { GetUserFavoritesUseCase } from "../application/use-cases/favorite/get-user-favorites.use-case";
import { PhotoController } from "../presentation/property/photo.controller";
import { FavoriteController } from "../presentation/property/favorite.controller";


// property use cases
const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository)
const getAllPropertiesUseCase = new GetAllPropertiesUseCase(propertyRepository)
const getPropertyUseCase = new GetPropertyUseCase(propertyRepository)
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyRepository)
const deletePropertyUseCase = new DeletePropertyUseCase(propertyRepository, photoRepository, cloudinaryService)
const toggleStatusUseCase = new ToggleStatusUseCase(propertyRepository)

export const propertyController = new PropertyController({
    createPropertyUseCase,
    getAllPropertiesUseCase,
    getPropertyUseCase,
    updatePropertyUseCase,
    deletePropertyUseCase,
    toggleStatusUseCase
})

// photo use cases
const uploadPhotosUseCase = new UploadPhotosUseCase(propertyRepository, cloudinaryService, photoRepository)
const deletePhotoUseCase = new DeletePhotoUseCase(photoRepository, propertyRepository, cloudinaryService)

export const photoController = new PhotoController({ uploadPhotosUseCase, deletePhotoUseCase })

// favorite use cases
const toggleFavoriteUseCase = new ToggleFavoriteUseCase(favoriteRepository, propertyRepository)
const getUserFavoritesUseCase = new GetUserFavoritesUseCase(favoriteRepository)

export const favoriteController = new FavoriteController({ toggleFavoriteUseCase, getUserFavoritesUseCase })


