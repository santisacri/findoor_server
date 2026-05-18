import { RefreshTokenEntity } from "../../entities/refresh-token.entity";


export interface IRefreshTokenRepository {
    create(userId: string, family?: string): Promise<RefreshTokenEntity>
    findByToken(token: string): Promise<RefreshTokenEntity | null>
    markAsUsed(id: string): Promise<void>
    deleteByUserId(userId: string): Promise<void>
}