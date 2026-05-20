import { CustomError } from "../errors/custom-errors"

export interface IPhotoProps {
    id: string,
    propertyId: string,
    url: string,
    publicId: string,
    order: number
}

export class PhotoEntity {
    private constructor(
        public id: string,
        public propertyId: string,
        public url: string,
        public publicId: string,
        public order: number
    ) { }

    static fromObject(obj: IPhotoProps): PhotoEntity {
        const { id, order, propertyId, publicId, url } = obj

        if (!id) throw CustomError.badRequest('Missing id')
        if (order == null) throw CustomError.badRequest('Missing order')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!publicId) throw CustomError.badRequest('Missing publicId')
        if (!url) throw CustomError.badRequest('Missing url')

        return new PhotoEntity(
            obj.id,
            obj.propertyId,
            obj.url,
            obj.publicId,
            obj.order
        )
    }
}