import { NextFunction, Request, Response } from "express";
import z, { ZodType } from "zod";



export default function validateBody(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { success, data, error} = schema.safeParse(req.body)

        if (!success) {
            return res.status(400).json({
                error: z.flattenError(error).fieldErrors
            })
        }

        req.body = data

        next()
    }
}