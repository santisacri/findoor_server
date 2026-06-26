import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { UserEntity } from "../../../domain/entities/user.entity";
import { TChangePersonalInfo } from "../../../presentation/user/user.schemas";

export interface IChangePersonalInfoUseCase {
    execute(data: TChangePersonalInfo, user: UserEntity): Promise<UserEntity>
}

export class ChangePersonalInfoUseCase implements IChangePersonalInfoUseCase {

    constructor(
        private readonly userRepo: IUserRepository
    ) { }


    execute({ name, phone }: TChangePersonalInfo, user: UserEntity): Promise<UserEntity> {
        user.name = name
        user.phone = phone

        return this.userRepo.save(user)
    }

}