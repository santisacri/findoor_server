import { IJwtService } from '../../domain/contracts/services/jwt.service.interface'

export const mockJwtService = (): jest.Mocked<IJwtService> => ({
    sign: jest.fn(),
    verify: jest.fn()
})