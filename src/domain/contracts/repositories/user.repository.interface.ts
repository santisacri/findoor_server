import { TRegisterUser } from "../../../presentation/auth/auth.schemas";
import { UserEntity } from "../../entities/user.entity";


export interface IUserRepository {
    createUser(user: TRegisterUser): Promise<UserEntity>
}