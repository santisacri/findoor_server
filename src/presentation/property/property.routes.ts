import { Router } from "express";
import { propertyController } from "../../container/property.container";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBody from "../middlewares/validate-body.middleware";
import { createPropertySchema } from "./property.schemas";


export class PropertyRoutes {

    static get routes(): Router {
        const router = Router()


        router.post('/', [authMiddleware, validateBody(createPropertySchema)], propertyController.createProperty)

        router.get('/', [authMiddleware], propertyController.getAllProperties)

        router.get('/:propertyId', [authMiddleware], propertyController.getPropertyById)




        return router
    }
}