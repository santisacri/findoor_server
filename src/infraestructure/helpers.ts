import { TGetProperties } from "../presentation/property/property.schemas";


export const createWhereClause = (filters: TGetProperties) => {
    const { cityId, minPrice,
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
        ...(cityId && { address: { cityId } }),
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