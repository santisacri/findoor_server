import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../../infraestructure/database/prisma'

export class ProvinceRoutes {
    static get routes(): Router {
        const router = Router()

        router.get('/:provinceId/city', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { provinceId } = req.params
                const { query } = req.query as { query?: string }

                const [startsWith, contains] = await Promise.all([
                    prisma.city.findMany({
                        where: {
                            provinceId: parseInt(provinceId as string),
                            name: { startsWith: query, mode: 'insensitive' }
                        },
                        orderBy: { name: 'asc' },
                        take: 5,
                        select: { id: true, name: true }
                    }),
                    prisma.city.findMany({
                        where: {
                            provinceId: parseInt(provinceId as string),
                            name: { contains: query, mode: 'insensitive' },
                            NOT: { name: { startsWith: query, mode: 'insensitive' } }
                        },
                        orderBy: { name: 'asc' },
                        take: 5,
                        select: { id: true, name: true }
                    })
                ])

                const cities = [...startsWith, ...contains].slice(0, 5)

                res.json({ cities })
            } catch (error) {
                next(error)
            }
        })

        return router
    }
}