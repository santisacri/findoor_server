import { ZodType } from "zod"


export interface IJwtService {
    sign(payload: { sub: string, exp: number }): string 
    verify<T>(token: string, schema: ZodType<T>): T
}