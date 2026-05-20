import { CustomError } from "../errors/custom-errors"
import { AddressEntity } from "./address.entity"

export enum OperationType {
    SALE = 'SALE',
    RENT = 'RENT'
}

export enum PropertyType {
    APARTMENT = 'APARTMENT',
    HOUSE = 'HOUSE'
}

export enum Currency {
    ARS = 'ARS',
    USD = 'USD'
}

interface PropertyEntityProps {
    id: string
    ownerId: string
    operationType: OperationType
    propertyType: PropertyType
    title: string
    description: string
    price: number
    currency: Currency
    totalAreaM2: number
    coveredAreaM2: number | null
    bedrooms: number
    bathrooms: number
    parkingSpots: number
    createdAt: Date
    updatedAt: Date
    isActive?: boolean
    address?: AddressEntity
}

export class PropertyEntity {

    public id: string
    public ownerId: string
    public operationType: OperationType
    public propertyType: PropertyType
    public title: string
    public description: string
    public price: number
    public currency: Currency
    public totalAreaM2: number
    public coveredAreaM2: number | null
    public bedrooms: number
    public bathrooms: number
    public parkingSpots: number
    public createdAt: Date
    public updatedAt: Date
    public isActive?: boolean
    public address?: AddressEntity


    private constructor(props: PropertyEntityProps) {
        this.id = props.id
        this.ownerId = props.ownerId
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
        this.address = props.address
        this.isActive = props.isActive
    }


    static fromObject(props: PropertyEntityProps) {
        const { id, ownerId } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!ownerId) throw CustomError.badRequest('Missing ownerId')


        return new PropertyEntity(props)
    }
}