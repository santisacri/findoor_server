import rateLimit from 'express-rate-limit'



export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: { message: 'Too many requests, try later' },
    standardHeaders: true,
    legacyHeaders: false
})

export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: { message: 'Too many requests, try later' },
    standardHeaders: true,
    legacyHeaders: false
})

