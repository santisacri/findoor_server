import { IRefreshTokenRepository } from "../../../domain/contracts/repositories/refresh-token.repository.interface";
import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";

export interface IResetPasswordUseCase {
    execute(newPassword: string, token: string): Promise<void>
}

export class ResetPasswordUseCase implements IResetPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly refreshTokenRepo: IRefreshTokenRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(newPassword: string, token: string): Promise<void> {
        const user = await this.userRepo.findByResetToken(token)
        const passwordHash = this.hashService.hash(newPassword)
        await this.userRepo.resetPassword(passwordHash, user.id)
        await this.refreshTokenRepo.globalLogout(user.id)
    }

}