import jwt from "jsonwebtoken";
import { IJwtService } from "../../domain/contracts/services/jwt.service.interface";
import { envs } from "../../env.schema";
import { ZodType } from "zod";
import { CustomError } from "../../domain/errors/custom-errors";

export class JwtService implements IJwtService {

    sign(payload: { sub: string, exp: number }): string {
        return jwt.sign({ sub: payload.sub }, envs.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: payload.exp,
            issuer: 'Findoor backend',
            audience: 'Findoor frontend'
        })
    }

    verify<T>(token: string, schema: ZodType<T>): T {
        try {
            const payload = jwt.verify(token, envs.JWT_SECRET)
            return schema.parse(payload)
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw CustomError.badRequest('Expired token')
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw CustomError.badRequest('Invalid token')
            }
            throw error
        }
    }

}