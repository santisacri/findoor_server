import { IHashService } from '../../domain/contracts/services/hash.service.interface'

export const mockHashService = (): jest.Mocked<IHashService> => ({
    hash: jest.fn(),
    compare: jest.fn()
})