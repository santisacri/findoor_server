import { Router } from "express";
import { authController } from "../../container/auth.container";
import validateBody from "../middlewares/validate-body.middleware";
import { registerUserSchema } from "./auth.schemas";



export class AuthRoutes {

    static get routes(): Router {
        const router = Router()

        router.post('/', [validateBody(registerUserSchema)], authController.registerUser)


        return router
    }
}