import z from "zod";
import { Currency, OperationType, PropertyType } from "../../domain/entities/property.entity";
import { Province } from "../../domain/entities/address.entity";


const addressSchema = z.object({
    province: z.enum(Province),
    city: z.string().min(4).max(30).trim(),
    neighborhood: z.string().min(4).max(20).trim(),
    street: z.string().min(4).max(25).trim().nullish(),
    streetNumber: z.string().max(12).trim().nullish(),
    lat: z.float32().nullish(),
    lon: z.float32().nullish(),
})

export type TAddress = z.infer<typeof addressSchema>


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

export const updatePropertySchema = createPropertySchema.extend({
  isActive: z.boolean()
})

export type TUpdateProperty = z.infer<typeof updatePropertySchema>

export const toggleStatusSchema = z.object({
  isActive: z.boolean()
})