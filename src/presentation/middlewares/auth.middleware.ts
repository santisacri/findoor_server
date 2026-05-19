import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom-errors";
import { jwtService } from "../../container/services.container";
import { jwtLoginSchema, TJwtLogin } from "../../infraestructure/validators/jwt.schema";
import { userRepository } from "../../container/repositories.container";
import { UserEntity } from "../../domain/entities/user.entity";

declare global {
    namespace Express {
        interface Request {
            user?: UserEntity
        }
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) throw CustomError.badRequest('Missing token')

    const payload = jwtService.verify<TJwtLogin>(token, jwtLoginSchema)

    const user = await userRepository.getUserById(payload.sub)

    req.user = user

    next()
}