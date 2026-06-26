import { Router } from "express";
import userController from "../../container/user.container";
import { authMiddleware } from "../middlewares/auth.middleware";
import validateBody from "../middlewares/validate-body.middleware";
import { changePersonalInfoSchema } from "./user.schemas";


export class UserRoutes {

    static get routes() {
        const router = Router()

        router.post('/', [authMiddleware, validateBody(changePersonalInfoSchema)], userController.changePersonalInfo)
        router.get('/:userId', userController.getUserById)

        return router
    }
}