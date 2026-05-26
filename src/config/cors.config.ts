// config/cors.config.ts
import cors from 'cors'
import { envs } from '../env.schema'

export const corsConfig = cors({
    origin: envs.IN_PRODUCTION
        ? envs.FRONTEND_URL
        : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
})