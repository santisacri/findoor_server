import cors from 'cors'
import { envs } from '../env.schema'

export const corsConfig = cors({
    origin: envs.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})