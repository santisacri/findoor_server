import { PrismaClient, User } from "../../../generated/prisma/client";
import { IUserDatasource } from "../../domain/contracts/datasources/user.datasource.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { TRegisterUser } from "../../presentation/auth/auth.schemas";
import { CustomError } from "../../domain/errors/custom-errors";



export class UserDatasource implements IUserDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }


    toEntity(prismaUser: User): UserEntity {
        const { verificationExpiresAt, verificationToken, resetToken, resetTokenExpiresAt, ...user } = prismaUser
        return UserEntity.fromObject({
            ...user,
        })
    }


    async save(user: UserEntity): Promise<UserEntity> {
        try {
            const record = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    phone: user.phone ?? null,
                    isVerified: user.isVerified
                }
            })

            return this.toEntity(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async createUser(user: TRegisterUser, verificationToken: string): Promise<UserEntity> {
        const verificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    ...user,
                    verificationToken,
                    verificationExpiresAt
                }
            })

            return this.toEntity(newUser)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email }
            })

            if (!user) return null

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getUserById(id: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { id }
            })

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async findByVerificationToken(token: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findFirstOrThrow({
                where: {
                    verificationToken: token,
                    verificationExpiresAt: { gt: new Date() }
                }
            })

            if (!user) throw CustomError.badRequest('Invalid token')

            return this.toEntity(user)
        } catch (error) {
            if (error instanceof CustomError) throw error
            throw CustomError.fromPrisma(error)
        }
    }

    async verifyUser(userId: string): Promise<void> {
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: {
                    isVerified: true,
                    verificationToken: null,
                    verificationExpiresAt: null
                }
            })

        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async assignResetToken(userId: string, resetToken: string): Promise<UserEntity> {
        try {
            const resetTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 1)
            const user = await this.prisma.user.update({
                where: { id: userId },
                data: { resetToken, resetTokenExpiresAt }
            })

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async findByResetToken(resetToken: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findFirstOrThrow({
                where: {
                    resetToken,
                    resetTokenExpiresAt: { gt: new Date() }
                }
            })

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.update({
                where: { id: userId, },
                data: {
                    password: newPassword,
                    resetToken: null,
                    resetTokenExpiresAt: null
                }
            })

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async deleteAccount(userId: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.delete({
                where: { id: userId }
            })

            return this.toEntity(user)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

}