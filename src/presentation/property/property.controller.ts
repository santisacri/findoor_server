import { NextFunction, Request, Response } from "express";
import { ICreatePropertyUseCase } from "../../application/use-cases/property/create-property.use-case";

interface UseCases {
    createPropertyUseCase: ICreatePropertyUseCase
}

export class PropertyController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    createProperty = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.user!
        try {
            const property = await this.useCases.createPropertyUseCase.execute(req.body, id)

            res.status(201).json({property})
        } catch (error) {
            next(error)
        }
    }

    getAllProperties = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error)
        }
    }

    getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
        try {

        } catch (error) {
            next(error)
        }
    }


}