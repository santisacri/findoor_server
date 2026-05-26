import { Router } from "express";
import { authController } from "../../container/auth.container";
import validateBody from "../middlewares/validate-body.middleware";
import { changePasswordSchema, loginUserSchema, registerUserSchema } from "./auth.schemas";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authRateLimit } from "../middlewares/rate-limit.middleware";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router()

        router.post('/register', [authRateLimit, validateBody(registerUserSchema)], authController.registerUser)
        router.post('/login', [authRateLimit, validateBody(loginUserSchema)], authController.loginUser)
        router.get('/refresh', authController.refreshToken)
        router.post('/logout', [authMiddleware], authController.logout)
        router.post('/change-password', [authRateLimit, authMiddleware, validateBody(changePasswordSchema)], authController.changePassword)

        return router
    }
}