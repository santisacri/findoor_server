import { ContactLeadRepository } from "../infraestructure/repositories/contact-lead.repository";
import { FavoriteRepository } from "../infraestructure/repositories/favorite.repository";
import { PhotoRepository } from "../infraestructure/repositories/photo.repository";
import { PropertyRepository } from "../infraestructure/repositories/property.repository";
import { RefreshTokenRepository } from "../infraestructure/repositories/refresh-token.repository";
import { UserRepository } from "../infraestructure/repositories/user.repository";
import { contactLeadDatasource, favoriteDatasource, photoDatasource, propertyDatasource, refreshTokenDatasource, userDatasource } from "./datasources.container";



export const userRepository = new UserRepository(userDatasource)
export const refreshTokenRepository = new RefreshTokenRepository(refreshTokenDatasource)
export const propertyRepository = new PropertyRepository(propertyDatasource)
export const photoRepository = new PhotoRepository(photoDatasource)
export const favoriteRepository = new FavoriteRepository(favoriteDatasource)
export const contactLeadRepository = new ContactLeadRepository(contactLeadDatasource)