export const PrismaClient = jest.fn()

export enum OperationType { SALE = 'SALE', RENT = 'RENT' }
export enum PropertyType { APARTMENT = 'APARTMENT', HOUSE = 'HOUSE' }
export enum Currency { ARS = 'ARS', USD = 'USD' }


export const Prisma = {
    PrismaClientKnownRequestError: class extends Error {
        code: string
        constructor(message: string, { code }: { code: string }) {
            super(message)
            this.code = code
        }
    }
}