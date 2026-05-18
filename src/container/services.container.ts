import { HashService } from "../infraestructure/services/hash.service";
import { JwtService } from "../infraestructure/services/jwt.service";


export const hashService = new HashService()
export const jwtService = new JwtService()