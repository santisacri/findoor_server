import { NextFunction, Request, Response } from "express";


export class AuthController {

    constructor(

    ) { }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        res.json('registerUser')
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        res.json('loginUser')
    }

}