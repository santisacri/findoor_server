import z from "zod";

export const registerUserSchema = z.object({
    name: z.string().min(3).max(25),
    password: z.string().min(8).max(16),
    email: z.email(),
    phone: z.number().nullish()
})

export type TRegisterUser = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(16)
})

export type TLoginUser = z.infer<typeof loginUserSchema>

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8).max(16),
    newPassword: z.string().min(8).max(16),
    repeatedPassword: z.string().min(8).max(16),
})

export type TChangePassword = z.infer<typeof changePasswordSchema>

export const forgotPasswordSchema = z.object({
    email: z.email()
})

