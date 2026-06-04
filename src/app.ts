import { Server } from "./server"
import { envs } from "./env.schema"
import { AppRouter } from "./presentation/app.router"
import { startCleanupJob } from "./infraestructure/jobs/cleanup.job"


(() => {
   Main()
})()


function Main() {
    const server = new Server(envs.PORT, AppRouter.routes)
    server.start()
    startCleanupJob()
}