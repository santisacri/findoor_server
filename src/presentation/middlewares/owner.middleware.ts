import { IPropertyRepository } from "../../domain/contracts/repositories/property.repository.interface"
import { CustomError } from "../../domain/errors/custom-errors"
import { NextFunction, Request, Response } from "express"

export const createOwnerMiddleware = (propertyRepo: IPropertyRepository) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = await propertyRepo.countByOwner(req.user!.id)
            if (count === 0) throw CustomError.forbidden('You dont have published any property')
            next()
        } catch (error) {
            next(error)
        }
    }
}