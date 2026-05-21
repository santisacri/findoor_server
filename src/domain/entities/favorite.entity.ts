import { CustomError } from "../errors/custom-errors"

export interface IFavoriteEntityProps {
    id: string
    userId: string
    propertyId: string
    createdAt: Date
}

export class FavoriteEntity {
    private constructor(
        public id: string,
        public userId: string,
        public propertyId: string,
        public createdAt: Date
    ) { }

    static fromObject(props: IFavoriteEntityProps) {
        const { id, userId, propertyId, createdAt } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!userId) throw CustomError.badRequest('Missing userId')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!createdAt) throw CustomError.badRequest('Missing createdAt')

        return new FavoriteEntity(id, userId, propertyId, createdAt)
    }
}