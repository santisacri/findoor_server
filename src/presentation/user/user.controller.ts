import { NextFunction, Request, Response } from "express";
import { IGetUserByIdUseCase } from "../../application/use-cases/user/get-user-by-id.use-case";

type UseCases = {
    getUserByIdUseCase: IGetUserByIdUseCase
}

export class UserController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params
        try {
            const { password, phone, isVerified, email, ...user } = await this.useCases.getUserByIdUseCase.execute(userId as string)

            res.json({ user })
        } catch (error) {
            next(error)
        }
    }
}