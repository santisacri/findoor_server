import { prisma } from "../infraestructure/database/prisma";
import { FavoriteDatasource } from "../infraestructure/datasources/favorite.datasource";
import { PhotoDatasource } from "../infraestructure/datasources/photo.datasource";
import { PropertyDatasource } from "../infraestructure/datasources/property.datasource";
import { RefreshTokenDatasource } from "../infraestructure/datasources/refresh-token.datasorce";
import { UserDatasource } from "../infraestructure/datasources/user.datasource";



export const userDatasource = new UserDatasource(prisma)
export const refreshTokenDatasource = new RefreshTokenDatasource(prisma)
export const propertyDatasource = new PropertyDatasource(prisma)
export const photoDatasource = new PhotoDatasource(prisma)
export const favoriteDatasource = new FavoriteDatasource(prisma)