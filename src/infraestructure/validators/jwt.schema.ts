import z from "zod"

export const jwtLoginSchema = z.object({
    sub: z.string(),
    iat: z.number(),
    exp: z.number(),
    iss: z.literal("Findoor backend"),
    aud: z.literal("Findoor frontend")
})

export type TJwtLogin = z.infer<typeof jwtLoginSchema>