import express, { Router } from "express"
import { errorMiddleware } from "./presentation/middlewares/global-error.middleware"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { corsConfig } from "./config/cors.config"
import { globalRateLimit } from "./presentation/middlewares/rate-limit.middleware"



export class Server {

    public readonly app = express()

    constructor(
        private readonly port: number,
        private readonly routes: Router,
    ) { }


    start() {
        this.app.use(globalRateLimit)
        this.app.use(corsConfig)
        this.app.use(helmet())

        this.app.use(express.json())
        this.app.use(cookieParser())

        this.app.use(this.routes)

        this.app.use(errorMiddleware)
        this.app.listen(this.port, () => {
            console.log('server started')
        })
    }
}