import { CustomError } from "../errors/custom-errors"


interface FavoriteEntityProps {
    id: string
    userId: string
    propertyId: string
    createdAt: Date
}

export class FavoriteEntity {
    private constructor(
        private props: FavoriteEntityProps
    ) { }


    static fromObject(props: FavoriteEntityProps) {
        const { createdAt, id, propertyId, userId } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!createdAt) throw CustomError.badRequest('Missing createdAt')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!userId) throw CustomError.badRequest('Missing userId')

        return new FavoriteEntity(props)
    }
}