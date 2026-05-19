import { PrismaClient } from "../../../generated/prisma/client";
import { IRefreshTokenDatasource } from "../../domain/contracts/datasources/refresh-token.datasource.interface";
import { RefreshTokenEntity } from "../../domain/entities/refresh-token.entity";
import { CustomError } from "../../domain/errors/custom-errors";

const EXP_DAYS = 7

export class RefreshTokenDatasource implements IRefreshTokenDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }

    private getTokenExpiry() {
        return new Date(Date.now() + 1000 * 60 * 60 * 24 * EXP_DAYS)
    }

    async create(userId: string, family?: string): Promise<RefreshTokenEntity> {
        try {
            const newToken = await this.prisma.refreshToken.create({
                data: {
                    expiresAt: this.getTokenExpiry(),
                    userId,
                    ...(family && { family })
                }
            })

            return RefreshTokenEntity.fromObject(newToken)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async findByToken(token: string): Promise<RefreshTokenEntity | null> {
        try {
            const record = await this.prisma.refreshToken.findUnique({
                where: { token }
            })

            if (!record) return null

            return RefreshTokenEntity.fromObject(record)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async markAsUsed(id: string): Promise<void> {
        try {
            await this.prisma.refreshToken.update({
                where: { id },
                data: { usedAt: new Date() }
            })
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }

    }

    async deleteByFamily(family: string): Promise<void> {
        try {
            await this.prisma.refreshToken.deleteMany({ where: { family } })
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async deleteByUserId(userId: string): Promise<void> {
        try {
            await this.prisma.refreshToken.deleteMany({ where: { userId } })
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

}