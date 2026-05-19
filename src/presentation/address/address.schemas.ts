import z from "zod";
import { Province } from "../../domain/entities/address.entity";


export const addressSchema = z.object({
    province: z.enum(Province),
    city: z.string().min(4).max(30).trim(),
    neighborhood: z.string().min(4).max(20).trim(),
    street: z.string().min(4).max(25).trim().nullish(),
    streetNumber: z.string().max(12).trim().nullish(),
    lat: z.float32().nullish(),
    lon: z.float32().nullish(),
})

export type TAddress = z.infer<typeof addressSchema>