import { CreateLeadUseCase } from '../../../../application/use-cases/contact-lead/create-lead.use-case'
import { mockContactLeadRepository } from '../../../mocks/contact-lead.repository.mock'
import { mockPropertyRepository } from '../../../mocks/property.repository.mock'
import { PropertyEntity, OperationType, PropertyType, Currency } from '../../../../domain/entities/property.entity'
import { ContactLeadEntity } from '../../../../domain/entities/contact-lead.entity'

const mockProperty = PropertyEntity.fromObject({
    id: 'property-uuid',
    ownerId: 'owner-uuid',
    title: 'Depto centro',
    description: 'Lindo depto',
    price: 100000,
    currency: Currency.ARS,
    operationType: OperationType.RENT,
    propertyType: PropertyType.APARTMENT,
    totalAreaM2: 50,
    coveredAreaM2: null,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpots: 0,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
})

const mockLead = ContactLeadEntity.fromObject({
    id: 'lead-uuid',
    propertyId: 'property-uuid',
    senderId: 'seeker-uuid',
    message: 'Me interesa la propiedad',
    isRead: false,
    createdAt: new Date(),
    senderName: 'john'
})

describe('CreateLeadUseCase', () => {
    let useCase: CreateLeadUseCase
    let contactLeadRepo: ReturnType<typeof mockContactLeadRepository>
    let propertyRepo: ReturnType<typeof mockPropertyRepository>

    beforeEach(() => {
        contactLeadRepo = mockContactLeadRepository()
        propertyRepo = mockPropertyRepository()
        useCase = new CreateLeadUseCase(contactLeadRepo, propertyRepo)
    })

    it('should create a lead successfully', async () => {
        propertyRepo.getProperty.mockResolvedValue(mockProperty)
        contactLeadRepo.createLead.mockResolvedValue(mockLead)

        const result = await useCase.execute('property-uuid', 'seeker-uuid', 'Me interesa la propiedad')

        expect(result).toBeInstanceOf(ContactLeadEntity)
        expect(contactLeadRepo.createLead).toHaveBeenCalledWith('property-uuid', 'seeker-uuid', 'Me interesa la propiedad')
    })

    it('should throw if property is not active', async () => {
        const inactiveProperty = PropertyEntity.fromObject({ ...mockProperty, isActive: false })
        propertyRepo.getProperty.mockResolvedValue(inactiveProperty)

        await expect(
            useCase.execute('property-uuid', 'seeker-uuid', 'Me interesa')
        ).rejects.toThrow()

        expect(contactLeadRepo.createLead).not.toHaveBeenCalled()
    })

    it('should throw if sender is the owner', async () => {
        propertyRepo.getProperty.mockResolvedValue(mockProperty)

        await expect(
            useCase.execute('property-uuid', 'owner-uuid', 'Me interesa')
        ).rejects.toThrow()

        expect(contactLeadRepo.createLead).not.toHaveBeenCalled()
    })

    it('should throw if property does not exist', async () => {
        propertyRepo.getProperty.mockRejectedValue(new Error('Not found'))

        await expect(
            useCase.execute('non-existent-uuid', 'seeker-uuid', 'Me interesa')
        ).rejects.toThrow()
    })
})