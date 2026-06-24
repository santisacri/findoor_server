import { CustomError } from "../errors/custom-errors"

export enum Province {
    BUENOS_AIRES = "Buenos Aires",
    CATAMARCA = "Catamarca",
    CHACO = "Chaco",
    CHUBUT = "Chubut",
    CORDOBA = "Córdoba",
    CORRIENTES = "Corrientes",
    ENTRE_RIOS = "Entre Ríos",
    FORMOSA = "Formosa",
    JUJUY = "Jujuy",
    LA_PAMPA = "La Pampa",
    LA_RIOJA = "La Rioja",
    MENDOZA = "Mendoza",
    MISIONES = "Misiones",
    NEUQUEN = "Neuquén",
    RIO_NEGRO = "Río Negro",
    SALTA = "Salta",
    SAN_JUAN = "San Juan",
    SAN_LUIS = "San Luis",
    SANTA_CRUZ = "Santa Cruz",
    SANTA_FE = "Santa Fe",
    SANTIAGO_DEL_ESTERO = "Santiago del Estero",
    TIERRA_DEL_FUEGO = "Tierra del Fuego",
    TUCUMAN = "Tucumán",
    CABA = "Ciudad Autónoma de Buenos Aires"
}

export interface AddressEntityProps {
    id: string
    propertyId: string
    city: { id: number; name: string }
    province: { id: number; name: string }
    neighborhood: string
    street: string | null
    streetNumber: string | null
    lat: number | null
    lng: number | null
}

export class AddressEntity {
    private constructor(
        public readonly id: string,
        public readonly propertyId: string,
        public readonly city: { id: number; name: string },
        public readonly province: { id: number; name: string },
        public readonly neighborhood: string,
        public readonly street: string | null,
        public readonly streetNumber: string | null,
        public readonly lat: number | null,
        public readonly lng: number | null,
    ) { }

    static fromObject(props: AddressEntityProps) {

        const { id, propertyId, city, province, neighborhood, street, streetNumber, lat, lng } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!city?.name) throw CustomError.badRequest('Missing city')
        if (!province?.name) throw CustomError.badRequest('Missing province')
        if (!neighborhood) throw CustomError.badRequest('Missing neighborhood')

        return new AddressEntity(
            id,
            propertyId,
            { id: city.id, name: city.name },
            { id: province.id, name: province.name },
            neighborhood,
            street ?? null,
            streetNumber ?? null,
            lat ?? null,
            lng ?? null
        )
    }
}