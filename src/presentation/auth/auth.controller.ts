import { NextFunction, Request, Response } from "express";
import { envs } from "../../env.schema";
import { IRegisterUserUseCase } from "../../application/use-cases/auth/register-user.use-case";
import { ILoginUserUseCase } from "../../application/use-cases/auth/login-user.use-case";
import { IRotateRefreshTokenUseCase } from "../../application/use-cases/auth/rotate-refresh-token.use-case";
import { CustomError } from "../../domain/errors/custom-errors";
import { ILogoutUseCase } from "../../application/use-cases/auth/logout.use-case";
import { IChangePasswordUseCase } from "../../application/use-cases/auth/change-password.use-case";
import { IVerifyAccountUseCase } from "../../application/use-cases/auth/verify-account.use-case";
import { IForgotPasswordUseCase } from "../../application/use-cases/auth/forgot-password.use-case";
import { IResetPasswordUseCase } from "../../application/use-cases/auth/reset-password.use-case";

interface UseCases {
    registerUserUseCase: IRegisterUserUseCase
    loginUserUseCase: ILoginUserUseCase
    rotateRefreshTokenUseCase: IRotateRefreshTokenUseCase
    logoutUseCase: ILogoutUseCase
    changePasswordUseCase: IChangePasswordUseCase,
    verifyAccountUseCase: IVerifyAccountUseCase,
    forgotPasswordUseCase: IForgotPasswordUseCase,
    resetPasswordUseCase: IResetPasswordUseCase
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

    changePassword = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body
        const user = req.user!
        try {
            const updatedUser = await this.useCases.changePasswordUseCase.execute(data, user)

            res.json({ updatedUser })
        } catch (error) {
            next(error)
        }
    }

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        try {
            await this.useCases.forgotPasswordUseCase.execute(email)

            res.json({ message: 'If your email exists, you will recieve a link to reset your password' })
        } catch (error) {
            next(error)
        }
    }

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        const { token, newPassword } = req.body
        try {
            await this.useCases.resetPasswordUseCase.execute(newPassword, token)

            res.json({ message: 'Password updated successfully' })
        } catch (error) {
            next(error)
        }
    }

    verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.query
        try {
            await this.useCases.verifyAccountUseCase.execute(token as string)

            res.json({ message: 'Account verified successfully' })
        } catch (error) {
            next(error)
        }
    }

}