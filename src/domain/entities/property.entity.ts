import { AddressEntity } from "./address.entity"
import { ContactLeadEntity } from "./contact-lead.entity"
import { FavoriteEntity } from "./favorite.entity"
import { UserEntity } from "./user.entity"

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
    owner?: UserEntity
    address?: AddressEntity
    favorites?: FavoriteEntity[]
    contactLeads?: ContactLeadEntity[]
}

export class PropertyEntity {

    private constructor(
        private props: PropertyEntityProps
    ) { }


    static fromObject(props: PropertyEntityProps) {
        return new PropertyEntity(props)
    }
}