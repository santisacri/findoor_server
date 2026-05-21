import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBody from "../middlewares/validate-body.middleware";
import { createPropertySchema, toggleStatusSchema, updatePropertySchema } from "./property.schemas";
import { uploadMiddleware } from "../middlewares/upload.middleware";
import { propertyController } from "../../container/property.container";
import { favoriteController } from "../../container/favorite.container";
import { photoController } from "../../container/photo.container";


export class PropertyRoutes {

    static get routes(): Router {
        const router = Router()


        router.post('/', [authMiddleware, validateBody(createPropertySchema)], propertyController.createProperty)
        router.get('/', [authMiddleware], propertyController.getAllProperties)
        router.get('/favorites', [authMiddleware], favoriteController.getFavorites)

        router.get('/:propertyId', [authMiddleware], propertyController.getPropertyById)
        router.put('/:propertyId', [authMiddleware, validateBody(updatePropertySchema)], propertyController.updateProperty)
        router.patch('/:propertyId', [authMiddleware, validateBody(toggleStatusSchema)], propertyController.toggleStatus)
        router.delete('/:propertyId', [authMiddleware], propertyController.deleteProperty)

        router.post('/:propertyId/photos', [authMiddleware, uploadMiddleware.array('photos', 10)], photoController.uploadPhotos)
        router.delete('/:propertyId/photos/:photoId', [authMiddleware], photoController.deletePhoto)
        router.post('/:propertyId/favorites', [authMiddleware], favoriteController.toggleFavorite)



        return router
    }
}