
interface AddressEntityProps {
    id: string
    propertyId: string
    province: string
    city: string
    neighborhood: string
    street: string
    streetNumber: number
    lat: number
    lng: number
}

export class AddressEntity {
    private constructor(
        private props: AddressEntityProps
    ) { }


    static fromObject(props: AddressEntityProps) {
        return new AddressEntity(props)
    }
}