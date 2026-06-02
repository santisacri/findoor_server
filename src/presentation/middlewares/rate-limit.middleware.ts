import rateLimit from 'express-rate-limit'
import { envs } from '../../env.schema'



export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: { message: 'Too many requests, try later' },
    standardHeaders: true,
    legacyHeaders: false
})

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: envs.IN_PRODUCTION === false ? 50 : 12,
    message: { message: 'Too many requests, try later' },
    standardHeaders: true,
    legacyHeaders: false
})

