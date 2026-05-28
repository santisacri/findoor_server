import { IUserDatasource } from "../../domain/contracts/datasources/user.datasource.interface";
import { IUserRepository } from "../../domain/contracts/repositories/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { TRegisterUser } from "../../presentation/auth/auth.schemas";


export class UserRepository implements IUserRepository {

    constructor(
        private readonly userDatasource: IUserDatasource
    ) { }

    resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        return this.userDatasource.resetPassword(newPassword, userId)
    }

    assignResetToken(userId: string, resetToken: string): Promise<UserEntity> {
        return this.userDatasource.assignResetToken(userId, resetToken)
    }

    findByResetToken(resetToken: string): Promise<UserEntity> {
        return this.userDatasource.findByResetToken(resetToken)
    }

    findByVerificationToken(token: string): Promise<UserEntity> {
        return this.userDatasource.findByVerificationToken(token)
    }

    verifyUser(userId: string): Promise<void> {
        return this.userDatasource.verifyUser(userId)
    }

    save(user: UserEntity): Promise<UserEntity> {
        return this.userDatasource.save(user)
    }

    getUserById(id: string): Promise<UserEntity> {
        return this.userDatasource.getUserById(id)
    }

    getUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userDatasource.getUserByEmail(email)

    }

    createUser(user: TRegisterUser, verificationToken: string): Promise<UserEntity> {
        return this.userDatasource.createUser(user, verificationToken)
    }

}