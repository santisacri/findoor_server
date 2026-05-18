import { IUserDatasource } from "../../domain/contracts/datasources/user.datasource.interface";
import { IUserRepository } from "../../domain/contracts/repositories/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { TRegisterUser } from "../../presentation/auth/auth.schemas";


export class UserRepository implements IUserRepository {

    constructor(
        private readonly userDatasource: IUserDatasource
    ) { }

    getUserByEmail(email: string): Promise<UserEntity> {
        return this.userDatasource.getUserByEmail(email)

    }

    createUser(user: TRegisterUser): Promise<UserEntity> {
        return this.userDatasource.createUser(user)
    }

}