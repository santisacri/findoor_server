import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IUserEntityProps } from "../../../domain/entities/user.entity";
import { TRegisterUser } from "../../../presentation/auth/auth.schemas";

export interface IRegisterUserUseCase {
    execute(user: TRegisterUser): Promise<Omit<IUserEntityProps, 'password'>>
}

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly userRepository: IUserRepository
    ) { }

    async execute(user: TRegisterUser): Promise<Omit<IUserEntityProps, 'password'>> {
        const newUser = await this.userRepository.createUser(user)
        return newUser.toJson
    }
}