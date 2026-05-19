import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { PropertyRoutes } from "./property/property.routes";


export class AppRouter {
    static get routes(): Router {
        const router = Router()

        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/property', PropertyRoutes.routes)

        return router
    }
}