import express, { Router } from "express"



export class Server {

    public readonly app = express()

    constructor(
        private readonly port: number,
        private readonly routes: Router,
    ) { }


    start() {

        this.app.use(express.json())

        this.app.use(this.routes)


        this.app.listen(this.port, () => {
            console.log('server started')
        })
    }
}