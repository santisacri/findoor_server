import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IUserEntityProps } from "../../../domain/entities/user.entity";

export interface IGetUserByIdUseCase {
    execute(userId: string): Promise<IUserEntityProps>
}


export class GetUserByIdUseCase implements IGetUserByIdUseCase {

    constructor(
        private readonly userRepo: IUserRepository
    ) { }

    execute(userId: string): Promise<IUserEntityProps> {
        return this.userRepo.getUserById(userId)
    }

}