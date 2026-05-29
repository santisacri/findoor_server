import { RegisterUserUseCase } from '../../../../application/use-cases/auth/register-user.use-case' 
import { mockUserRepository } from '../../../mocks/user.repository.mock'
import { mockHashService } from '../../../mocks/hash.service.mock'
import { mockEmailService } from '../../../mocks/email.service.mock'
import { UserEntity } from '../../../../domain/entities/user.entity'

const mockUser = UserEntity.fromObject({
    id: 'uuid-123',
    name: 'Santiago',
    email: 'santi@test.com',
    password: 'hashed_password',
    phone: null,
    isVerified: false,
    createdAt: new Date()
})

const input = {
    name: 'Santiago',
    email: 'santi@test.com',
    password: '123456',
    phone: null
}

describe('RegisterUserUseCase', () => {
    let useCase: RegisterUserUseCase
    let userRepo: ReturnType<typeof mockUserRepository>
    let hashService: ReturnType<typeof mockHashService>
    let emailService: ReturnType<typeof mockEmailService>

    beforeEach(() => {
        userRepo = mockUserRepository()
        hashService = mockHashService()
        emailService = mockEmailService()
        useCase = new RegisterUserUseCase(userRepo, hashService, emailService)
    })

    it('should register a user and send verification email', async () => {
        hashService.hash.mockReturnValue('hashed_password')
        userRepo.createUser.mockResolvedValue(mockUser)
        emailService.sendVerificationEmail.mockResolvedValue(undefined)

        const result = await useCase.execute(input)

        expect(result).toEqual({ message: 'Check your email to verify your account' })
        expect(hashService.hash).toHaveBeenCalledWith('123456')
        expect(userRepo.createUser).toHaveBeenCalledTimes(1)
        expect(emailService.sendVerificationEmail).toHaveBeenCalledWith(mockUser.email, expect.any(String), mockUser.name)
    })

    it('should hash the password before saving', async () => {
        hashService.hash.mockReturnValue('hashed_password')
        userRepo.createUser.mockResolvedValue(mockUser)
        emailService.sendVerificationEmail.mockResolvedValue(undefined)

        await useCase.execute(input)

        expect(userRepo.createUser).toHaveBeenCalledWith(
            expect.objectContaining({ password: 'hashed_password' }),
            expect.any(String)
        )
    })

    it('should not send email if user creation fails', async () => {
        hashService.hash.mockReturnValue('hashed_password')
        userRepo.createUser.mockRejectedValue(new Error('DB error'))

        await expect(useCase.execute(input)).rejects.toThrow('DB error')
        expect(emailService.sendVerificationEmail).not.toHaveBeenCalled()
    })
})