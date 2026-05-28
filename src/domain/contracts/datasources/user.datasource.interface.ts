import { TRegisterUser } from "../../../presentation/auth/auth.schemas";
import { UserEntity } from "../../entities/user.entity";


export interface IUserDatasource {
    createUser(user: TRegisterUser, verificationToken: string): Promise<UserEntity>
    assignResetToken(userId: string, resetToken: string): Promise<UserEntity>
    findByResetToken(resetToken: string): Promise<UserEntity>
    findByVerificationToken(token: string): Promise<UserEntity>
    verifyUser(userId: string): Promise<void>
    getUserByEmail(email: string): Promise<UserEntity | null>
    getUserById(id: string): Promise<UserEntity>
    save(user: UserEntity): Promise<UserEntity>
}