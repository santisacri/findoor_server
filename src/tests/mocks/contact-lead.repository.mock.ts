import { IContactLeadRepository } from '../../domain/contracts/repositories/contact-lead.repository.interface'


export const mockContactLeadRepository = (): jest.Mocked<IContactLeadRepository> => ({
    getOwnerLeads: jest.fn(),
    markAsRead: jest.fn(),
    createLead: jest.fn(),
    findById: jest.fn()
})