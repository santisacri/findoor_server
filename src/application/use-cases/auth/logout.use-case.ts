import { IRefreshTokenRepository } from "../../../domain/contracts/repositories/refresh-token.repository.interface";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface ILogoutUseCase {
    execute(userId: string, refreshToken: string, global: boolean): Promise<void>
}


export class LogoutUseCase implements ILogoutUseCase {

    constructor(
        private readonly refreshTokenRepository: IRefreshTokenRepository
    ) { }


    async execute(userId: string, refreshToken: string, global: boolean): Promise<void> {
        if (global) {
            await this.refreshTokenRepository.globalLogout(userId)
            return
        }

        const token = await this.refreshTokenRepository.findByToken(refreshToken)

        if (!token) throw CustomError.notFound('Refresh token not found')

        await this.refreshTokenRepository.deleteByFamily(token.family)
        return
    }

}