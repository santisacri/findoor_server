import { ChangePasswordUseCase } from "../application/use-cases/auth/change-password.use-case";
import { ForgotPasswordUseCase } from "../application/use-cases/auth/forgot-password.use-case";
import { LoginUserUseCase } from "../application/use-cases/auth/login-user.use-case";
import { LogoutUseCase } from "../application/use-cases/auth/logout.use-case";
import { RegisterUserUseCase } from "../application/use-cases/auth/register-user.use-case";
import { RotateRefreshTokenUseCase } from "../application/use-cases/auth/rotate-refresh-token.use-case";
import { VerifyAccountUseCase } from "../application/use-cases/auth/verify-account.use-case";
import { AuthController } from "../presentation/auth/auth.controller";
import { emailService } from "./email.container";
import { refreshTokenRepository, userRepository } from "./repositories.container";
import { hashService, jwtService } from "./services.container";



const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService, emailService)
const loginUserUseCase = new LoginUserUseCase(userRepository, refreshTokenRepository, hashService, jwtService)
const rotateRefreshTokenUseCase = new RotateRefreshTokenUseCase(refreshTokenRepository, jwtService)
const logoutUseCase = new LogoutUseCase(refreshTokenRepository)
const changePasswordUseCase = new ChangePasswordUseCase(userRepository, hashService)
const verifyAccountUseCase = new VerifyAccountUseCase(userRepository)
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, emailService)


export const authController = new AuthController({
    registerUserUseCase,
    loginUserUseCase,
    rotateRefreshTokenUseCase,
    logoutUseCase,
    changePasswordUseCase,
    verifyAccountUseCase,
    forgotPasswordUseCase
})