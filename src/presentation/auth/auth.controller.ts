import { NextFunction, Request, Response } from "express";
import { envs } from "../../env.schema";
import { IRegisterUserUseCase } from "../../application/use-cases/auth/register-user.use-case";
import { ILoginUserUseCase } from "../../application/use-cases/auth/login-user.use-case";

interface UseCases {
    registerUserUseCase: IRegisterUserUseCase
    loginUserUseCase: ILoginUserUseCase
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

}