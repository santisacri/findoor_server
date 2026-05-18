import { TRegisterUser } from "../../../presentation/auth/auth.schemas";
import { UserEntity } from "../../entities/user.entity";


export interface IUserDatasource {
    createUser(user: TRegisterUser): Promise<UserEntity>
    getUserByEmail(email: string): Promise<UserEntity>
}