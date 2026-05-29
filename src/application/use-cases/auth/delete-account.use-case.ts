import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { UserEntity } from "../../../domain/entities/user.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IDeleteAccountUseCase {
    execute(user: UserEntity, password: string): Promise<void>
}

export class DeleteAccountUseCase implements IDeleteAccountUseCase {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly hashService: IHashService
    ) { }

    async execute(user: UserEntity, password: string): Promise<void> {
        const isValid = this.hashService.compare(user.password, password)
        if (!isValid) throw CustomError.badRequest('Invalid password')

        await this.userRepo.deleteAccount(user.id)
    }

}