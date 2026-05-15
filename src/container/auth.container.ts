import { RegisterUserUseCase } from "../application/use-cases/auth/register-user.use-case";
import { prisma } from "../infraestructure/database/prisma";
import { UserDatasource } from "../infraestructure/datasources/user.datasource";
import { UserRepository } from "../infraestructure/repositories/user.repository";
import { AuthController } from "../presentation/auth/auth.controller";
import { hashService } from "./services.container";

const userDatasource = new UserDatasource(prisma)
const userRepository = new UserRepository(userDatasource)

const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService)


export const authController = new AuthController({ registerUserUseCase })