import { IRefreshTokenRepository } from "../../../domain/contracts/repositories/refresh-token.repository.interface";
import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";
import { IHashService } from "../../../domain/contracts/services/hash.service.interface";
import { IJwtService } from "../../../domain/contracts/services/jwt.service.interface";
import { RefreshTokenEntity } from "../../../domain/entities/refresh-token.entity";
import { IUserEntityProps } from "../../../domain/entities/user.entity";
import { CustomError } from "../../../domain/errors/custom-errors";
import { TLoginUser } from "../../../presentation/auth/auth.schemas";

export interface ILoginUserUseCase {
    execute(data: TLoginUser): Promise<{user: Omit<IUserEntityProps, 'password'>, token: string, refreshToken: RefreshTokenEntity}>
}

export class LoginUserUseCase implements ILoginUserUseCase {

    private readonly jwtExpiry = 60 * 15

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly refreshTokenRepository: IRefreshTokenRepository,
        private readonly hashService: IHashService,
        private readonly jwtService: IJwtService,
    ) { }

    async execute(data: TLoginUser): Promise<{user: Omit<IUserEntityProps, 'password'>, token: string, refreshToken: RefreshTokenEntity}> {
        const user = await this.userRepository.getUserByEmail(data.email)
        const isValid = this.hashService.compare(user.password, data.password)
        if (!isValid) throw CustomError.badRequest('Invalid password')

        const token = this.jwtService.sign({ sub: user.id, exp: this.jwtExpiry })

        const refreshToken = await this.refreshTokenRepository.create(user.id)

        return {user: user.toJson, token, refreshToken}
    }

}