import 'dotenv/config'
import z from "zod";

const envSchema = z.object({
    PORT: z.string().transform(Number),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),
    IN_PRODUCTION: z.string().transform(val => val === 'true')
})

export const envs = envSchema.parse(process.env)