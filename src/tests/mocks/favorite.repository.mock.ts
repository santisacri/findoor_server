import { IFavoriteRepository } from '../../domain/contracts/repositories/favorite.repository.interface'

export const mockFavoriteRepository = (): jest.Mocked<IFavoriteRepository> => ({
    toggleFavorite: jest.fn(),
    getFavorites: jest.fn()
})