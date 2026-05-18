import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-errors";


export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    console.log(`unexpected error: ${err}`)

    return res.status(500).json({ message: 'Internal server error' })
}