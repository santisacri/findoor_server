
export interface IHashService {
    hash(password: string): string
    compare(hash: string, password: string): boolean
}