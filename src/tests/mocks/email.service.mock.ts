import { IEmailService } from "../../domain/contracts/services/email.service.interface"


export const mockEmailService = (): jest.Mocked<Pick<IEmailService, 'sendVerificationEmail' | 'sendPasswordResetEmail'>> => ({
    sendVerificationEmail: jest.fn(),
    sendPasswordResetEmail: jest.fn()
})