import { NextFunction, Request, Response } from "express";
import { IGetUserByIdUseCase } from "../../application/use-cases/user/get-user-by-id.use-case";
import { TChangePersonalInfo } from "./user.schemas";
import { IChangePersonalInfoUseCase } from "../../application/use-cases/user/change-personal-info.use-case";

type UseCases = {
    getUserByIdUseCase: IGetUserByIdUseCase,
    changePersonalInfoUseCase: IChangePersonalInfoUseCase,
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

    changePersonalInfo = async (req: Request, res: Response, next: NextFunction) => {
        const data = req.body as TChangePersonalInfo
        const oldUser = req.user
        try {
            const user = await this.useCases.changePersonalInfoUseCase.execute(data, oldUser!)

            res.json({ user })
        } catch (error) {
            next(error)
        }
    }
}