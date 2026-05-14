import 'dotenv/config'
import z from "zod";

const envSchema = z.object({
    PORT: z.string().transform(Number),
    DATABASE_URL: z.url(),
})

export const envs = envSchema.parse(process.env)