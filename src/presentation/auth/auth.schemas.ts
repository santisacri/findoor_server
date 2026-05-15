import z from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3).max(25),
    password: z.string().min(8).max(16),
    email: z.email(),
    phone: z.number().nullish()
})

export type TRegisterUser = z.infer<typeof registerUserSchema>