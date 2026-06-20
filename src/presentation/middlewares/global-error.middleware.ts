import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-errors";
import { envs } from "../../env.schema";

const errorLog = (error: CustomError) => {
    return `CustomError = {  
    message: ${error.message},  
    stack: ${error.stack?.split(' ').at(-1)?.split('Findoor-backend').at(-1)},
    date: ${new Date(Date.now()).toLocaleString('es-AR')},
}`
}

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        if (!envs.IN_PRODUCTION) console.log(errorLog(err))
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    console.log(`unexpected error: ${err}`)

    return res.status(500).json({ message: 'Internal server error' })
}