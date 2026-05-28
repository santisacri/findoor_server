import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IEmailService } from "../../../domain/contracts/services/email.service.interface";
import { TokenService } from "../../../infraestructure/services/token.service";

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<void>
}

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly emailService: IEmailService
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.userRepo.getUserByEmail(email)
        if (!user) return

        const token = TokenService.generate()

        await this.userRepo.assignResetToken(user.id, token)
        await this.emailService.sendPasswordResetEmail(user.email, token, user.name)
    }

}