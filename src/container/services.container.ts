import { CloudinaryService } from "../infraestructure/services/cloudinary.service";
import { HashService } from "../infraestructure/services/hash.service";
import { JwtService } from "../infraestructure/services/jwt.service";


export const hashService = new HashService()
export const jwtService = new JwtService()
export const cloudinaryService = new CloudinaryService()