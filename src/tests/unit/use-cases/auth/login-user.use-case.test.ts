import { LoginUserUseCase } from '../../../../application/use-cases/auth/login-user.use-case'
import { mockUserRepository } from '../../../mocks/user.repository.mock'
import { mockHashService } from '../../../mocks/hash.service.mock'
import { mockJwtService } from '../../../mocks/jwt.service.mock'
import { mockRefreshTokenRepository } from '../../../mocks/refresh-token.repository'
import { UserEntity } from '../../../../domain/entities/user.entity'
import { RefreshTokenEntity } from '../../../../domain/entities/refresh-token.entity'

const mockUser = UserEntity.fromObject({
    id: 'uuid-123',
    name: 'Santiago',
    email: 'santi@test.com',
    password: 'hashed_password',
    phone: null,
    isVerified: true,
    createdAt: new Date()
})

const mockRefreshToken = RefreshTokenEntity.fromObject({
    id: 'rt-uuid',
    userId: 'uuid-123',
    token: 'refresh-token-value',
    family: 'family-uuid',
    usedAt: null,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date()
})

const input = { email: 'santi@test.com', password: '123456' }

describe('LoginUserUseCase', () => {
    let useCase: LoginUserUseCase
    let userRepo: ReturnType<typeof mockUserRepository>
    let refreshTokenRepo: ReturnType<typeof mockRefreshTokenRepository>
    let hashService: ReturnType<typeof mockHashService>
    let jwtService: ReturnType<typeof mockJwtService>

    beforeEach(() => {
        userRepo = mockUserRepository()
        refreshTokenRepo = mockRefreshTokenRepository()
        hashService = mockHashService()
        jwtService = mockJwtService()
        useCase = new LoginUserUseCase(userRepo, refreshTokenRepo, hashService, jwtService)
    })

    it('should login successfully and return user, token and refreshToken', async () => {
        userRepo.getUserByEmail.mockResolvedValue(mockUser)
        hashService.compare.mockReturnValue(true)
        jwtService.sign.mockReturnValue('access-token')
        refreshTokenRepo.create.mockResolvedValue(mockRefreshToken)

        const result = await useCase.execute(input)

        expect(result.token).toBe('access-token')
        expect(result.refreshToken).toBeInstanceOf(RefreshTokenEntity)
        expect(result.user).not.toHaveProperty('password')
    })

    it('should throw if user not found', async () => {
        userRepo.getUserByEmail.mockResolvedValue(null)

        await expect(useCase.execute(input)).rejects.toThrow()
        expect(hashService.compare).not.toHaveBeenCalled()
    })

    it('should throw if account is not verified', async () => {
        const unverifiedUser = UserEntity.fromObject({ ...mockUser, isVerified: false })
        userRepo.getUserByEmail.mockResolvedValue(unverifiedUser)

        await expect(useCase.execute(input)).rejects.toThrow()
        expect(hashService.compare).not.toHaveBeenCalled()
    })

    it('should throw if password is invalid', async () => {
        userRepo.getUserByEmail.mockResolvedValue(mockUser)
        hashService.compare.mockReturnValue(false)

        await expect(useCase.execute(input)).rejects.toThrow()
        expect(jwtService.sign).not.toHaveBeenCalled()
        expect(refreshTokenRepo.create).not.toHaveBeenCalled()
    })
})