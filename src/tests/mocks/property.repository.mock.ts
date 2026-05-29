import { IPropertyRepository } from '../../domain/contracts/repositories/property.repository.interface'

export const mockPropertyRepository = (): jest.Mocked<IPropertyRepository> => ({
    createProperty: jest.fn(),
    getAllProperties: jest.fn(),
    getOwnerProperties: jest.fn(),
    getProperty: jest.fn(),
    countByOwner: jest.fn(),
    updateProperty: jest.fn(),
    toggleStatus: jest.fn(),
    deleteProperty: jest.fn()
})