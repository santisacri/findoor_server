import crypto from 'crypto'

export class TokenService {
    static generate(): string {
        return crypto.randomBytes(32).toString('hex')
    }
}