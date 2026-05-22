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
        const { created_at, ...user } = prismaUser
        return UserEntity.fromObject({
            ...user,
            createdAt: created_at,
        })
    }

    toPrisma(userEntity: UserEntity): User {
        const { createdAt, phone, ...user } = userEntity
        return {
            ...user,
            phone: phone ?? null,
            created_at: createdAt,
        }
    }

    async save(user: UserEntity): Promise<UserEntity> {
        const prismaUser = this.toPrisma(user)
        try {
            const record = await this.prisma.user.update({
                where: { id: user.id },
                data: prismaUser
            })

            return this.toEntity(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async createUser(user: TRegisterUser): Promise<UserEntity> {
        try {
            const newUser = await this.prisma.user.create({
                data: user
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