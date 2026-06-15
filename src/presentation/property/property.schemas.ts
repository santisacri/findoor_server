import z from "zod";
import { Currency, OperationType, PropertyType } from "../../domain/entities/property.entity";


const addressSchema = z.object({
    provinceId: z.number(),
    cityId: z.number(),
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
    parkingSpots: z.number(),
    operationType: z.enum(OperationType),
    propertyType: z.enum(PropertyType),
    address: addressSchema
})

export type TCreateProperty = z.infer<typeof createPropertySchema>

export const updatePropertySchema = createPropertySchema.extend({
    isActive: z.boolean()
})

export type TUpdateProperty = z.infer<typeof updatePropertySchema>

export const getPropertiesSchema = z.object({
    page: z.string().default('1').transform(Number),
    cityId: z.string().transform(Number).optional(),
    minPrice: z.string().transform(Number).optional(),
    maxPrice: z.string().transform(Number).optional(),
    operationType: z.enum(OperationType).optional(),
    propertyType: z.enum(PropertyType).optional(),
    bedrooms: z.string().transform(Number).optional(),
    bathrooms: z.string().transform(Number).optional(),
    minTotalArea: z.string().transform(Number).optional(),
    maxTotalArea: z.string().transform(Number).optional(),
    minCoveredArea: z.string().transform(Number).optional(),
    maxCoveredArea: z.string().transform(Number).optional(),
    parkingSpots: z.string().transform(Number).optional(),
})

export type TGetProperties = z.infer<typeof getPropertiesSchema>

export const toggleStatusSchema = z.object({
    isActive: z.boolean()
})

export const sendMessageSchema = z.object({
    message: z.string().min(10).max(80)
})

export const getAllPropertiesSchema = z.object({
    page: z.number().min(1)
})