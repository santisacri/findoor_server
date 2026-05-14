import express, { Router } from "express"
import { errorMiddleware } from "./presentation/middlewares/global-error.middleware"
import { CustomError } from "./domain/errors/custom-errors"



export class Server {

    public readonly app = express()

    constructor(
        private readonly port: number,
        private readonly routes: Router,
    ) { }


    start() {
        this.app.use(express.json())

        this.app.use(this.routes)

        this.app.use(errorMiddleware)
        this.app.listen(this.port, () => {
            console.log('server started')
        })
    }
}