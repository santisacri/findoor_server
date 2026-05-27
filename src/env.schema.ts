import 'dotenv/config'
import z from "zod";

const requiredString = z.string().min(1)

const envSchema = z.object({
    PORT: requiredString.transform(Number),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(10),
    IN_PRODUCTION: requiredString.transform(val => val === 'true'),
    CLOUDINARY_CLOUD_NAME: requiredString,
    CLOUDINARY_API_KEY: requiredString,
    CLOUDINARY_API_SECRET: requiredString,
    FRONTEND_URL: z.string().optional(),
    RESEND_API_KEY: requiredString,
    DOMAIN: z.string().optional()
})

export const envs = envSchema.parse(process.env)