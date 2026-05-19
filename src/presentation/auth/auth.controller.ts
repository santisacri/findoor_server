import { NextFunction, Request, Response } from "express";
import { envs } from "../../env.schema";
import { IRegisterUserUseCase } from "../../application/use-cases/auth/register-user.use-case";
import { ILoginUserUseCase } from "../../application/use-cases/auth/login-user.use-case";
import { IRotateRefreshTokenUseCase } from "../../application/use-cases/auth/rotate-refresh-token.use-case";
import { CustomError } from "../../domain/errors/custom-errors";
import { ILogoutUseCase } from "../../application/use-cases/auth/logout.use-case";

interface UseCases {
    registerUserUseCase: IRegisterUserUseCase
    loginUserUseCase: ILoginUserUseCase
    rotateRefreshTokenUseCase: IRotateRefreshTokenUseCase
    logoutUseCase: ILogoutUseCase
}

export class AuthController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.useCases.registerUserUseCase.execute(req.body)

            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken: RT, ...result } = await this.useCases.loginUserUseCase.execute(req.body)

            res.cookie('refreshToken', RT.token, {
                httpOnly: true,
                secure: envs.IN_PRODUCTION,
                sameSite: 'strict',
                path: '/auth/refresh',
                expires: RT.expiresAt
            })

            return res.json(result)
        } catch (error) {
            next(error)
        }
    }

    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.cookies

            if (typeof refreshToken !== 'string') throw CustomError.badRequest('Refresh token is not valid')

            const { refreshToken: RT, jwt } = await this.useCases.rotateRefreshTokenUseCase.execute(refreshToken)

            res.cookie('refreshToken', RT.token, {
                httpOnly: true,
                secure: envs.IN_PRODUCTION,
                sameSite: 'strict',
                path: '/auth/refresh',
                expires: RT.expiresAt
            })

            res.json({ token: jwt })
        } catch (error) {
            next(error)
        }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const global = req.query.global === 'true'
            const { id } = req.user!
            const { refreshToken } = req.cookies

            await this.useCases.logoutUseCase.execute(id, refreshToken, global)

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: envs.IN_PRODUCTION,
                sameSite: 'strict',
                path: '/auth/refresh',
            })

            res.json({ message: 'Logged out' })
        } catch (error) {
            next(error)
        }
    }

}