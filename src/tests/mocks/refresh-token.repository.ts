import { IRefreshTokenRepository } from '../../domain/contracts/repositories/refresh-token.repository.interface'

export const mockRefreshTokenRepository = (): jest.Mocked<IRefreshTokenRepository> => ({
    create: jest.fn(),
    findByToken: jest.fn(),
    markAsUsed: jest.fn(),
    deleteByFamily: jest.fn(),
    globalLogout: jest.fn()
})