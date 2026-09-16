import { IHashService } from "../../domain/contracts/services/hash.service.interface";
import bcrypt from "bcryptjs";

export class HashService implements IHashService {


    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async compare(hash: string, password: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

}