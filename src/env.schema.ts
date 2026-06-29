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
    FRONTEND_URL: z.transform(value => (value === '' || value === undefined) ? 'http://localhost:5173' : value),
    RESEND_API_KEY: requiredString,
    DOMAIN: z.string().optional(),
    PASSWORD_USER_SEED: z.string(),
})

export const envs = envSchema.parse(process.env)