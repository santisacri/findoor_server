import { PrismaClient } from "../../../generated/prisma/client";
import { IUserDatasource } from "../../domain/contracts/datasources/user.datasource.interface";
import { Role, UserEntity } from "../../domain/entities/user.entity";
import { TRegisterUser } from "../../presentation/auth/auth.schemas";
import { Role as PrismaRole } from "../../../generated/prisma/client";

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
        const {role, created_at, ...user} = prismaUser
        return UserEntity.fromObject({
            ...user, 
            createdAt: created_at, 
            role: role as unknown as Role
        })
    }

    async createUser(user: TRegisterUser): Promise<UserEntity> {
        const newUser = await this.prisma.user.create({
            data: user
        })

        return this.toEntity(newUser)
    }

}