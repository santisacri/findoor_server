import { CustomError } from "../errors/custom-errors"

interface AddressEntityProps {
    id: string
    propertyId: string
    province: string
    city: string
    neighborhood: string
    street: string
    streetNumber: number
    lat: number
    lon: number
}

export class AddressEntity {
    private constructor(
        private props: AddressEntityProps
    ) { }


    static fromObject(props: AddressEntityProps) {
        const { id, propertyId, province, city, neighborhood, street, streetNumber, lat, lon } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!province) throw CustomError.badRequest('Missing province')
        if (!city) throw CustomError.badRequest('Missing city')
        if (!neighborhood) throw CustomError.badRequest('Missing neighborhood')
        if (!street) throw CustomError.badRequest('Missing street')
        if (!streetNumber) throw CustomError.badRequest('Missing streetNumber')
        if (!lat) throw CustomError.badRequest('Missing lat')
        if (!lon) throw CustomError.badRequest('Missing lon')

        return new AddressEntity(props)
    }
}