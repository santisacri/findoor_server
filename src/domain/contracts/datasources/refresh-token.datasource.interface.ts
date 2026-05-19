import { RefreshTokenEntity } from "../../entities/refresh-token.entity";


export interface IRefreshTokenDatasource {
    create(userId: string, family?: string): Promise<RefreshTokenEntity>
    findByToken(token: string): Promise<RefreshTokenEntity | null>
    markAsUsed(id: string): Promise<void>
    deleteByFamily(family: string): Promise<void>
    deleteByUserId(userId: string): Promise<void>
}