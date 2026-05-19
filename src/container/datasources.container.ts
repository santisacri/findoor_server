import { prisma } from "../infraestructure/database/prisma";
import { PropertyDatasource } from "../infraestructure/datasources/property.datasource";
import { RefreshTokenDatasource } from "../infraestructure/datasources/refresh-token.datasorce";
import { UserDatasource } from "../infraestructure/datasources/user.datasource";



export const userDatasource = new UserDatasource(prisma)

export const refreshTokenDatasource = new RefreshTokenDatasource(prisma)

export const propertyDatasource = new PropertyDatasource(prisma)