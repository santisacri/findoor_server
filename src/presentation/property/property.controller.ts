import { NextFunction, Request, Response } from "express";
import { ICreatePropertyUseCase } from "../../application/use-cases/property/create-property.use-case";
import { IGetPropertyUseCase } from "../../application/use-cases/property/get-property.use-case";
import { IUpdatePropertyUseCase } from "../../application/use-cases/property/update-property.use-case";
import { IDeletePropertyUseCase } from "../../application/use-cases/property/delete-property.use-case";
import { IToggleStatusUseCase } from "../../application/use-cases/property/toggle-status.use-case";
import { IGetOwnerPropertiesUseCase } from "../../application/use-cases/property/get-owner-properties.use-case";
import { IGetAllPropertiesUseCase } from "../../application/use-cases/property/get-all-properties.use-case";
import { getPropertiesSchema } from "./property.schemas";
import { PropertyEntity } from "../../domain/entities/property.entity";


interface UseCases {
    createPropertyUseCase: ICreatePropertyUseCase,
    getOwnerPropertiesUseCase: IGetOwnerPropertiesUseCase,
    getPropertyUseCase: IGetPropertyUseCase,
    updatePropertyUseCase: IUpdatePropertyUseCase,
    toggleStatusUseCase: IToggleStatusUseCase,
    deletePropertyUseCase: IDeletePropertyUseCase,
    getAllPropertiesUseCase: IGetAllPropertiesUseCase
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
        try {
            const filters = getPropertiesSchema.parse(req.query)
            const { properties, total } = await this.useCases.getAllPropertiesUseCase.execute(filters)

            res.json({ properties: properties.map(p => p.toJson), total })
        } catch (error) {
            next(error)
        }
    }

    getOwnerProperties = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!

        try {
            const properties = await this.useCases.getOwnerPropertiesUseCase.execute(id)

            console.log()
            res.json({ properties: properties.map(p => p.toJson) })
        } catch (error) {
            next(error)
        }
    }

    getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string

        try {
            const property = await this.useCases.getPropertyUseCase.execute(propertyId)

            res.json({ property: property.toJson})
        } catch (error) {
            next(error)
        }
    }

    updateProperty = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!

        try {
            const property = await this.useCases.updatePropertyUseCase.execute(req.body, propertyId, id)

            res.json({ property: property.toJson })
        } catch (error) {
            next(error)
        }
    }

    toggleStatus = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!
        const { isActive } = req.body

        try {
            await this.useCases.toggleStatusUseCase.execute(isActive, propertyId, id)

            res.json({ message: 'status changed successfully' })
        } catch (error) {
            next(error)
        }
    }

    deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
        const propertyId = req.params.propertyId as string
        const { id } = req.user!

        try {
            await this.useCases.deletePropertyUseCase.execute(propertyId, id)

            res.json({ message: 'Property deleted Successfully' })
        } catch (error) {
            next(error)
        }
    }
}