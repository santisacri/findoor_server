import { RefreshTokenRepository } from "../infraestructure/repositories/refresh-token.repository";
import { UserRepository } from "../infraestructure/repositories/user.repository";
import { refreshTokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)

export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)
