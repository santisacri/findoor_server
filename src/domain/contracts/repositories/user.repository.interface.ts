import { TRegisterUser } from "../../../presentation/auth/auth.schemas";
import { UserEntity } from "../../entities/user.entity";


export interface IUserRepository {
    createUser(user: TRegisterUser, verificationToken: string): Promise<UserEntity>
    getUserByEmail(email: string): Promise<UserEntity>
    getUserById(id: string): Promise<UserEntity>
    save(user: UserEntity): Promise<UserEntity>
}