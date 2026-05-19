import { IRefreshTokenDatasource } from "../../domain/contracts/datasources/refresh-token.datasource.interface";
import { IRefreshTokenRepository } from "../../domain/contracts/repositories/refresh-token.repository.interface";
import { RefreshTokenEntity } from "../../domain/entities/refresh-token.entity";


export class RefreshTokenRepository implements IRefreshTokenRepository {

    constructor(
        private readonly refreshTokenDatasource: IRefreshTokenDatasource
    ) { }


    async create(userId: string, family?: string): Promise<RefreshTokenEntity> {
        return this.refreshTokenDatasource.create(userId, family)
    }

    async findByToken(token: string): Promise<RefreshTokenEntity | null> {
        return this.refreshTokenDatasource.findByToken(token)

    }

    async markAsUsed(id: string): Promise<void> {
        return this.refreshTokenDatasource.markAsUsed(id)

    }

    async deleteByFamily(family: string): Promise<void> {
        return this.refreshTokenDatasource.deleteByFamily(family)
    }

    async globalLogout(userId: string): Promise<void> {
        return this.refreshTokenDatasource.deleteByUserId(userId)
    }

}