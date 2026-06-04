import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../../infraestructure/database/prisma'

export class ProvinceRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/:provinceId/city', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { provinceId } = req.params
                const { query } = req.query as { query?: string }

                const cities = await prisma.$queryRaw<{ id: number; name: string }[]>`
                    SELECT id, name FROM cities
                    WHERE province_id = ${parseInt(provinceId as string)}
                    AND unaccent(lower(name)) LIKE unaccent(lower(${`%${query}%`}))
                    ORDER BY 
                        CASE WHEN unaccent(lower(name)) LIKE unaccent(lower(${`${query}%`})) THEN 0 ELSE 1 END,
                        name ASC
                    LIMIT 5
                    `

                res.json({ cities })
            } catch (error) {
                next(error)
            }
        })

        return router
    }
}