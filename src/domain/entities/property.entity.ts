import { CustomError } from "../errors/custom-errors"

enum OperationType {
    SALE,
    RENT
}

enum PropertyType {
    APARTMENT,
    HOUSE
}

enum Currency {
    ARS,
    USD
}

interface PropertyEntityProps {
    id: string
    ownerId: string
    addressId: string
    operationType: OperationType
    propertyType: PropertyType
    title: string
    description: string
    price: number
    currency: Currency
    totalAreaM2: number
    coveredAreaM2: number
    bedrooms: number
    bathrooms: number
    parkingSpots: number
    createdAt: Date
    updatedAt: Date
}

export class PropertyEntity {

    private constructor(
        private props: PropertyEntityProps
    ) { }


    static fromObject(props: PropertyEntityProps) {
        const { id, ownerId, addressId } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!ownerId) throw CustomError.badRequest('Missing ownerId')
        if (!addressId) throw CustomError.badRequest('Missing addressId')

        return new PropertyEntity(props)
    }
}