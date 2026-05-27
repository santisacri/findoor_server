import { IRefreshTokenRepository } from "../../../domain/contracts/repositories/refresh-token.repository.interface";
import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { IJwtService } from "../../../domain/contracts/services/jwt.service.interface";
import { RefreshTokenEntity } from "../../../domain/entities/refresh-token.entity";
import { IUserEntityProps } from "../../../domain/entities/user.entity";
import { CustomError } from "../../../domain/errors/custom-errors";
import { envs } from "../../../env.schema";
import { TLoginUser } from "../../../presentation/auth/auth.schemas";

export interface ILoginUserUseCase {
    execute(data: TLoginUser): Promise<{user: Omit<IUserEntityProps, 'password'>, token: string, refreshToken: RefreshTokenEntity}>
}

export class LoginUserUseCase implements ILoginUserUseCase {

    private readonly jwtExpiry = envs.IN_PRODUCTION ? 60 * 15 : 60 * 60

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly hashService: IHashService,
        private readonly jwtService: IJwtService,
    ) { }

    async execute(data: TLoginUser): Promise<{user: Omit<IUserEntityProps, 'password'>, token: string, refreshToken: RefreshTokenEntity}> {
        const user = await this.userRepository.getUserByEmail(data.email)

        if(!user.isVerified) throw CustomError.forbidden('You need to verify your account in order to login')

        const isValid = this.hashService.compare(user.password, data.password)
        if (!isValid) throw CustomError.badRequest('Invalid password')

        const token = this.jwtService.sign({ sub: user.id, exp: this.jwtExpiry })

        const refreshToken = await this.refreshTokenRepository.create(user.id)

        return {user: user.toJson, token, refreshToken}
    }

}