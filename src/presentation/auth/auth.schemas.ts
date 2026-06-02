import z from "zod";

const passwordValidation = z.string().min(8).max(24).regex(/[0-9]/).regex(/[a-z]/).regex(/[A-Z]/)

export const registerUserSchema = z.object({
    name: z.string().min(3).max(24),
    password: passwordValidation,
    email: z.email(),
    phone: z.string().nullish()
})

export type TRegisterUser = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.email(),
    password: passwordValidation
})

export type TLoginUser = z.infer<typeof loginUserSchema>

export const changePasswordSchema = z.object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    repeatedPassword: passwordValidation,
})

export type TChangePassword = z.infer<typeof changePasswordSchema>

export const forgotPasswordSchema = z.object({
    email: z.email()
})

export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: passwordValidation
})

export type TResetPassword = z.infer<typeof resetPasswordSchema>

export const deleteAccountSchema = z.object({
    password: passwordValidation
})


