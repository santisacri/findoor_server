import { TGetProperties } from "../presentation/property/property.schemas";


export const createWhereClause = (filters: TGetProperties) => {
    const { city, minPrice,
        maxPrice, operationType, propertyType,
        bedrooms, bathrooms, parkingSpots,
        minCoveredArea, maxCoveredArea, maxTotalArea,
        minTotalArea } = filters

    const where = {
        isActive: true,
        ...(operationType && { operationType }),
        ...(propertyType && { propertyType }),
        ...(bedrooms && { bedrooms }),
        ...(bathrooms && { bathrooms }),
        ...(parkingSpots && { parkingSpots }),
        ...(city && { address: { city: { contains: city, mode: 'insensitive' as const } } }),
        ...((minPrice || maxPrice) && {
            price: {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice })
            }
        }),
        ...((minTotalArea || maxTotalArea) && {
            totalAreaM2: {
                ...(minTotalArea && { gte: minTotalArea }),
                ...(maxTotalArea && { lte: maxTotalArea })
            }
        }),
        ...((minCoveredArea || maxCoveredArea) && {
            coveredAreaM2: {
                ...(minCoveredArea && { gte: minCoveredArea }),
                ...(maxCoveredArea && { lte: maxCoveredArea })
            }
        }),
    }

    return where
}