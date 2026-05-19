import { LoginUserUseCase } from "../application/use-cases/auth/login-user.use-case";
import { LogoutUseCase } from "../application/use-cases/auth/logout.use-case";
import { RegisterUserUseCase } from "../application/use-cases/auth/register-user.use-case";
import { RotateRefreshTokenUseCase } from "../application/use-cases/auth/rotate-refresh-token.use-case";
import { AuthController } from "../presentation/auth/auth.controller";
import { refreshTokenRepository, userRepository } from "./repositories.container";
import { hashService, jwtService } from "./services.container";



const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService)
const loginUserUseCase = new LoginUserUseCase(userRepository, refreshTokenRepository, hashService, jwtService)
const rotateRefreshTokenUseCase = new RotateRefreshTokenUseCase(refreshTokenRepository, jwtService)
const logoutUseCase = new LogoutUseCase(refreshTokenRepository)


export const authController = new AuthController({ registerUserUseCase, loginUserUseCase, rotateRefreshTokenUseCase, logoutUseCase })