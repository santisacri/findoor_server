import { Prisma } from "../../../generated/prisma/client"



export class CustomError extends Error {

    private constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) { super(message) }


    static badRequest(message = "Bad Request") {
        return new CustomError(message, 400)
    }

    static unauthorized(message = "Unauthorized") {
        return new CustomError(message, 401)
    }

    static forbidden(message = "Forbidden") {
        return new CustomError(message, 403)
    }

    static notFound(message = "Not Found") {
        return new CustomError(message, 404)
    }

    static internal(message = "Internal Server Error") {
        return new CustomError(message, 500)
    }

    static fromPrisma(error: unknown): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            switch (error.code) {
                case 'P2002':
                    const message = error.message.split('\n').at(-1)?.trim();
                    throw new CustomError(  message ?? 'Unique constraint violated', 409);
                case 'P2025':
                    throw new CustomError('Record not found', 404);
                case 'P2003':
                    throw new CustomError('Foreign key violation', 400);
            }
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
            throw new CustomError('Invalid data sent to database', 400);
        }

        throw new CustomError('Internal Server Error', 500);
    }
}
