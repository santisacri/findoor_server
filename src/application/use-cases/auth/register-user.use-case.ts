import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { IUserEntityProps } from "../../../domain/entities/user.entity";
import { TRegisterUser } from "../../../presentation/auth/auth.schemas";

export interface IRegisterUserUseCase {
    execute(user: TRegisterUser): Promise<Omit<IUserEntityProps, 'password'>>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(user: TRegisterUser): Promise<Omit<IUserEntityProps, 'password'>> {
        const hash = this.hashService.hash(user.password)
        const newUser = await this.userRepository.createUser({...user, password: hash})
        return newUser.toJson
    }
}