import 'dotenv/config'
import z from "zod";

const envSchema = z.object({
    PORT: z.string().transform(Number),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string(),
    IN_PRODUCTION: z.string().transform(val => val === 'true'),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
})

export const envs = envSchema.parse(process.env)