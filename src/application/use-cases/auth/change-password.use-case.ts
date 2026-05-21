import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { IUserEntityProps, UserEntity } from "../../../domain/entities/user.entity";
import { CustomError } from "../../../domain/errors/custom-errors";
import { TChangePassword } from "../../../presentation/auth/auth.schemas";

export interface IChangePasswordUseCase {
    execute(data: TChangePassword, user: UserEntity): Promise<Omit<IUserEntityProps, 'password'>>
}

export class ChangePasswordUseCase implements IChangePasswordUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(data: TChangePassword, user: UserEntity): Promise<Omit<IUserEntityProps, "password">> {
        if (data.newPassword !== data.repeatedPassword) throw CustomError.badRequest('New password and repeated password arent the same')

        const isValid = this.hashService.compare(user.password, data.currentPassword)

        if (!isValid) throw CustomError.forbidden('Invalid password')

        const updatedUserEntity = UserEntity.fromObject({ ...user, password: this.hashService.hash(data.newPassword) })

        const updatedUser = await this.userRepo.save(updatedUserEntity)

        return updatedUser.toJson
    }
}