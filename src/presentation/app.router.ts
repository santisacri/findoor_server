import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PropertyRoutes } from "./property/property.routes";
import { ProvinceRoutes } from "./province/province.routes";
import { CityRoutes } from "./city/city.routes";


export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/property', PropertyRoutes.routes)

        // endpoint only for frontend autocomplete, no Clean Arch needed at all
        router.use('/api/province', ProvinceRoutes.routes)
        router.use('/api/city', CityRoutes.routes)

        return router
    }
}