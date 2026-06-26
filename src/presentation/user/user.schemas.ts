import z from "zod";


export const changePersonalInfoSchema = z.object({
    name: z.string().min(3).max(24).trim().regex(/^[A-Za-z]+(?: [A-Za-z]+)?$/, {
        message: 'Name must contain one or two words',
    }),
    phone: z.string().nullish()
})

export type TChangePersonalInfo = z.infer<typeof changePersonalInfoSchema>