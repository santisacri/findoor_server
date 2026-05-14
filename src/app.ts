import { Server } from "./server"
import { envs } from "./env.schema"
import { AppRouter } from "./presentation/app.router"


(() => {
   Main()
})()


function Main() {
    const server = new Server(envs.PORT, AppRouter.routes)

    server.start()
}