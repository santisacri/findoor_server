import { IHashService } from "../../domain/contracts/services/hash.service.interface";
import bcrypt from "bcryptjs";

export class HashService implements IHashService {


    hash(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    compare(hash: string, password: string): boolean {
        return bcrypt.compareSync(password, hash)
    }

}