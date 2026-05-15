import { NextFunction, Request, Response } from "express";
import { IRegisterUserUseCase } from "../../application/use-cases/auth/register-user.use-case";

interface UseCases {
    registerUserUseCase: IRegisterUserUseCase
}

export class AuthController {

    constructor(
        private readonly useCases: UseCases
    ) { }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await this.useCases.registerUserUseCase.execute(req.body)
            res.status(201).json({ user: newUser })
        } catch (error) {
            next(error)
        }
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        res.json('loginUser')
    }

}