import { prisma } from '../database/prisma'

export const startCleanupJob = () => {
    const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24

    setInterval(async () => {
        const deleted = await prisma.refreshToken.deleteMany({
            where: {
                OR: [
                    { expiresAt: { lt: new Date() } },
                    { usedAt: { not: null } }
                ]
            }
        })

        console.log(`[Cleanup] Deleted ${deleted.count} refresh tokens`)
    }, TWENTY_FOUR_HOURS)
}