import { NextFunction, Request, Response } from "express";
import { ICreatePropertyUseCase } from "../../application/use-cases/property/create-property.use-case";
import { IGetAllPropertiesUseCase } from "../../application/use-cases/property/get-all-properties.use-case";
import { IGetPropertyUseCase } from "../../application/use-cases/property/get-property.use-case";
import { IUpdatePropertyUseCase } from "../../application/use-cases/photo/update-property.use-case";
import { IDeletePropertyUseCase } from "../../application/use-cases/property/delete-property.use-case";
import { IToggleStatusUseCase } from "../../application/use-cases/property/toggle-status.use-case";


interface UseCases {
    createPropertyUseCase: ICreatePropertyUseCase,
    getAllPropertiesUseCase: IGetAllPropertiesUseCase,
    getPropertyUseCase: IGetPropertyUseCase,
    updatePropertyUseCase: IUpdatePropertyUseCase,
    toggleStatusUseCase: IToggleStatusUseCase,
    deletePropertyUseCase: IDeletePropertyUseCase
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

    getOwnerProperties = async (req: Request, res: Response, next: NextFunction) => {
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
        const { id } = req.user!

        try {
            const property = await this.useCases.getPropertyUseCase.execute(propertyId, id)

            res.json({ property })
        } catch (error) {
            next(error)
        }
    }

    updateProperty = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!

        try {
            const property = await this.useCases.updatePropertyUseCase.execute(req.body, propertyId, id)

            res.json({ property })
        } catch (error) {
            next(error)
        }
    }

    toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!

        try {
            const property = await this.useCases.toggleStatusUseCase.execute(req.body, propertyId, id)

            res.json({ property })
        } catch (error) {
            next(error)
        }
    }

    deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!

        try {
            await this.useCases.deletePropertyUseCase.execute(propertyId, id)

            res.json({ message: 'Property deleted Succesfully' })
        } catch (error) {
            next(error)
        }
    }
}