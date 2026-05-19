import { IRefreshTokenRepository } from "../../../domain/contracts/repositories/refresh-token.repository.interface";
import { IJwtService } from "../../../domain/contracts/services/jwt.service.interface";
import { RefreshTokenEntity } from "../../../domain/entities/refresh-token.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IRotateRefreshTokenUseCase {
    execute(token: string): Promise<{ refreshToken: RefreshTokenEntity, jwt: string }>
}

export class RotateRefreshTokenUseCase implements IRotateRefreshTokenUseCase {

    private readonly jwtExpiry = 60 * 30

    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly jwtService: IJwtService,

    ) { }

    async execute(token: string): Promise<{ refreshToken: RefreshTokenEntity, jwt: string }> {
        const oldToken = await this.refreshTokenRepository.findByToken(token)

        if (!oldToken) throw CustomError.notFound('Token not found')

        if (oldToken.isUsed) {
            await this.refreshTokenRepository.deleteByFamily(oldToken.family)
            throw CustomError.forbidden('token already used')
        }

        if (oldToken.isExpired) {
            await this.refreshTokenRepository.deleteByFamily(oldToken.family)
            throw CustomError.forbidden('Expired token')
        }

        await this.refreshTokenRepository.markAsUsed(oldToken.id)
        const newRefreshToken = await this.refreshTokenRepository.create(oldToken.userId, oldToken.family)

        const jwtToken = this.jwtService.sign({ sub: oldToken.userId, exp: this.jwtExpiry })

        return { refreshToken: newRefreshToken, jwt: jwtToken }
    }

}