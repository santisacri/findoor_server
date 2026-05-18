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

    public id: string
    public ownerId: string
    public addressId: string
    public operationType: OperationType
    public propertyType: PropertyType
    public title: string
    public description: string
    public price: number
    public currency: Currency
    public totalAreaM2: number
    public coveredAreaM2: number
    public bedrooms: number
    public bathrooms: number
    public parkingSpots: number
    public createdAt: Date
    public updatedAt: Date

    private constructor(props: PropertyEntityProps) {
        this.id = props.id
        this.ownerId = props.ownerId
        this.addressId = props.addressId
        this.operationType = props.operationType
        this.propertyType = props.propertyType
        this.title = props.title
        this.description = props.description
        this.bathrooms = props.bathrooms
        this.price = props.price
        this.currency = props.currency
        this.totalAreaM2 = props.totalAreaM2
        this.coveredAreaM2 = props.coveredAreaM2
        this.bedrooms = props.bedrooms
        this.parkingSpots = props.parkingSpots
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }


    static fromObject(props: PropertyEntityProps) {
        const { id, ownerId, addressId } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!ownerId) throw CustomError.badRequest('Missing ownerId')
        if (!addressId) throw CustomError.badRequest('Missing addressId')

        return new PropertyEntity(props)
    }
}