import { Router } from "express";
import userController from "../../container/user.container";


export class UserRoutes {

    static get routes() {
        const router = Router()

        router.use('/:userId', userController.getUserById)

        return router
    }
}