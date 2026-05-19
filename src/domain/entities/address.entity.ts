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

interface AddressEntityProps {
    id: string
    propertyId: string
    province: Province
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