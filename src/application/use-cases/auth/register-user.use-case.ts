import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IEmailService } from "../../../domain/contracts/services/email.service.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { IUserEntityProps } from "../../../domain/entities/user.entity";
import { TokenService } from "../../../infraestructure/services/token.service";
import { TRegisterUser } from "../../../presentation/auth/auth.schemas";

export interface IRegisterUserUseCase {
    execute(user: TRegisterUser): Promise<{ message: string }>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashService: IHashService,
        private readonly emailService: IEmailService
    ) { }

    async execute(user: TRegisterUser): Promise<{ message: string }> {
        const hash = this.hashService.hash(user.password)
        const token = TokenService.generate()

        const newUser = await this.userRepository.createUser({ ...user, password: hash, }, token)

        await this.emailService.sendVerificationEmail(newUser.email, token, newUser.name)
        return { message: 'Check your email to verify your account' }
    }
}