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
        const { verificationExpiresAt, verificationToken, ...user } = prismaUser
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

    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({
                where: { email }
            })

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

}