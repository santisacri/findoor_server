import { CustomError } from "../errors/custom-errors"

interface Props {
    id: string
    userId: string
    family: string
    token: string
    expiresAt: Date
    usedAt: Date | null
    createdAt: Date
}

export class RefreshTokenEntity {

    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly family: string,
        public readonly token: string,
        public readonly expiresAt: Date,
        public readonly usedAt: Date | null,
        public readonly createdAt: Date
    ) { }


    static fromObject(object: Props): RefreshTokenEntity {
        const { createdAt, expiresAt, family, id, token, usedAt, userId } = object

        if(!id) throw CustomError.badRequest('Missing id')
        if(!createdAt) throw CustomError.badRequest('Missing createdAt')
        if(!expiresAt) throw CustomError.badRequest('Missing expiresAt')
        if(!family) throw CustomError.badRequest('Missing family')
        if(!token) throw CustomError.badRequest('Missing token')
        if(!userId) throw CustomError.badRequest('Missing userId')

        return new RefreshTokenEntity(id, userId, family, token, expiresAt, usedAt, createdAt)
    }

    get isExpired() { return this.expiresAt < new Date() }
    get isUsed() { return this.usedAt !== null }
}