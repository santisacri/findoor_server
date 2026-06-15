import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../../infraestructure/database/prisma'

export class CityRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/:cityId', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { cityId } = req.params

                const id = parseInt(cityId as string)

                const city = await prisma.city.findUniqueOrThrow({
                    where: { id }
                })

                res.json({ city })
            } catch (error) {
                next(error)
            }
        })

        return router
    }
}