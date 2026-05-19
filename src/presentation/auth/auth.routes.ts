import { Router } from "express";
import { authController } from "../../container/auth.container";
import validateBody from "../middlewares/validate-body.middleware";
import { loginUserSchema, registerUserSchema } from "./auth.schemas";
import { authMiddleware } from "../middlewares/auth.middleware";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router()

        router.post('/register', [validateBody(registerUserSchema)], authController.registerUser)
        router.post('/login', [validateBody(loginUserSchema)], authController.loginUser)
        router.get('/refresh', authController.refreshToken)
        router.post('/logout', authMiddleware, authController.logout)


        return router
    }
}