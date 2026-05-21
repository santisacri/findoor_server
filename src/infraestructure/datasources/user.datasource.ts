import { PrismaClient, User } from "../../../generated/prisma/client";
import { IUserDatasource } from "../../domain/contracts/datasources/user.datasource.interface";
import { Role, UserEntity } from "../../domain/entities/user.entity";
import { TRegisterUser } from "../../presentation/auth/auth.schemas";
import { Role as PrismaRole } from "../../../generated/prisma/client";
import { CustomError } from "../../domain/errors/custom-errors";


type TPrismaUser = {
    name: string;
    password: string;
    email: string;
    phone: number | null;
    id: string;
    role: PrismaRole;
    created_at: Date;
}

export class UserDatasource implements IUserDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }


    toEntity(prismaUser: TPrismaUser): UserEntity {
        const { role, created_at, ...user } = prismaUser
        return UserEntity.fromObject({
            ...user,
            createdAt: created_at,
            role: role as unknown as Role
        })
    }

    toPrisma(userEntity: UserEntity): User {
        const { role, createdAt, phone, ...user } = userEntity
        return {
            ...user,
            phone: phone ?? null,
            created_at: createdAt,
            role: role as unknown as PrismaRole
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