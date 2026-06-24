import { CustomError } from "../errors/custom-errors"
import { AddressEntity } from "./address.entity"
import { PhotoEntity } from "./photo.entity"

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
    isActive: boolean
    address: AddressEntity
    photos?: PhotoEntity[]
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
    public isActive: boolean
    public photos: PhotoEntity[]
    public address: AddressEntity


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
        this.photos = props.photos ?? []
    }


    static fromObject(props: any): PropertyEntity {
        const {
            id, ownerId, operationType, propertyType, title, description,
            price, currency, totalAreaM2, bedrooms, bathrooms, parkingSpots,
            createdAt, updatedAt, isActive, address, photos = []
        } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!ownerId) throw CustomError.badRequest('Missing ownerId')
        if (!operationType) throw CustomError.badRequest('Missing operationType')
        if (!propertyType) throw CustomError.badRequest('Missing propertyType')
        if (!title) throw CustomError.badRequest('Missing title')
        if (!description) throw CustomError.badRequest('Missing description')
        if (!price) throw CustomError.badRequest('Missing price')
        if (!currency) throw CustomError.badRequest('Missing currency')
        if (!totalAreaM2) throw CustomError.badRequest('Missing totalAreaM2')
        if (!bedrooms) throw CustomError.badRequest('Missing bedrooms')
        if (!bathrooms) throw CustomError.badRequest('Missing bathrooms')
        if (parkingSpots == null) throw CustomError.badRequest('Missing parkingSpots')
        if (!createdAt) throw CustomError.badRequest('Missing createdAt')
        if (!updatedAt) throw CustomError.badRequest('Missing updatedAt')
        if (isActive == null) throw CustomError.badRequest('Missing isActive')

        return new PropertyEntity({
            ...props,
            address: address instanceof AddressEntity ? address : AddressEntity.fromObject(address),
            photos: photos.map((p: any) => p instanceof PhotoEntity ? p : PhotoEntity.fromObject(p))
        })
    }

    get toJson() {
        const { photos, ...rest } = this as any
        return {
            ...rest,
            photos: photos?.map((p: any) => ({ id: p.id, url: p.url })) ?? []
        }
    }

    get photoUrls(): string[] {
        return this.photos?.map(p => p.url) ?? []
    }
}