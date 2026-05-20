import { NextFunction, Request, Response } from "express";
import { ICreatePropertyUseCase } from "../../application/use-cases/property/create-property.use-case";
import { IGetAllPropertiesUseCase } from "../../application/use-cases/property/get-all-properties.use-case";
import { IGetPropertyUseCase } from "../../application/use-cases/property/get-property.use-case";

interface UseCases {
    createPropertyUseCase: ICreatePropertyUseCase,
    getAllPropertiesUseCase: IGetAllPropertiesUseCase,
    getPropertyUseCase: IGetPropertyUseCase,
}

export class PropertyController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    createProperty = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        try {
            const property = await this.useCases.createPropertyUseCase.execute(req.body, id)

            res.status(201).json({ property })
        } catch (error) {
            next(error)
        }
    }

    getAllProperties = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        try {
            const properties = await this.useCases.getAllPropertiesUseCase.execute(id)

            res.json({ properties })
        } catch (error) {
            next(error)
        }
    }

    getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        try {
            const property = await this.useCases.getPropertyUseCase.execute(propertyId)

            res.json({ property })
        } catch (error) {
            next(error)
        }
    }


}