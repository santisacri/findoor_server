import { IUserRepository } from '../../domain/contracts/repositories/user.repository.interface'

export const mockUserRepository = (): jest.Mocked<IUserRepository> => ({
    createUser: jest.fn(),
    findByVerificationToken: jest.fn(),
    assignResetToken: jest.fn(),
    findByResetToken: jest.fn(),
    resetPassword: jest.fn(),
    verifyUser: jest.fn(),
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
    deleteAccount: jest.fn(),
    save: jest.fn()
})