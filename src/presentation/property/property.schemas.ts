import z from "zod";
import { Currency, OperationType, PropertyType } from "../../domain/entities/property.entity";
import { addressSchema } from "../address/address.schemas";


export const createPropertySchema = z.object({
    title: z.string().min(10).max(50).trim(),
    description: z.string().min(10).max(250).trim(),
    price: z.coerce.number().positive(),
    currency: z.enum(Currency),
    totalAreaM2: z.number().positive(),
    coveredAreaM2: z.number().positive().nullish(),
    bedrooms: z.number().positive(),
    bathrooms: z.number().positive(),
    parkingSpots: z.number().positive(),
    operationType: z.enum(OperationType),
    propertyType: z.enum(PropertyType),
    address: addressSchema
})

export type TCreateProperty = z.infer<typeof createPropertySchema>