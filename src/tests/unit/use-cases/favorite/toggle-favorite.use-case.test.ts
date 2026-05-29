import { ToggleFavoriteUseCase } from '../../../../application/use-cases/favorite/toggle-favorite.use-case'
import { mockFavoriteRepository } from '../../../mocks/favorite.repository.mock'
import { mockPropertyRepository } from '../../../mocks/property.repository.mock'
import { PropertyEntity, OperationType, PropertyType, Currency } from '../../../../domain/entities/property.entity'

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

describe('ToggleFavoriteUseCase', () => {
    let useCase: ToggleFavoriteUseCase
    let favoriteRepo: ReturnType<typeof mockFavoriteRepository>
    let propertyRepo: ReturnType<typeof mockPropertyRepository>

    beforeEach(() => {
        favoriteRepo = mockFavoriteRepository()
        propertyRepo = mockPropertyRepository()
        useCase = new ToggleFavoriteUseCase(favoriteRepo, propertyRepo)
    })

    it('should add to favorites and return isFavorite true', async () => {
        propertyRepo.getProperty.mockResolvedValue(mockProperty)
        favoriteRepo.toggleFavorite.mockResolvedValue(true)

        const result = await useCase.execute('property-uuid', 'seeker-uuid')

        expect(result).toEqual({ isFavorite: true })
        expect(favoriteRepo.toggleFavorite).toHaveBeenCalledWith('property-uuid', 'seeker-uuid')
    })

    it('should remove from favorites and return isFavorite false', async () => {
        propertyRepo.getProperty.mockResolvedValue(mockProperty)
        favoriteRepo.toggleFavorite.mockResolvedValue(false)

        const result = await useCase.execute('property-uuid', 'seeker-uuid')

        expect(result).toEqual({ isFavorite: false })
    })

    it('should throw if user tries to favorite their own property', async () => {
        propertyRepo.getProperty.mockResolvedValue(mockProperty)

        await expect(
            useCase.execute('property-uuid', 'owner-uuid')
        ).rejects.toThrow()

        expect(favoriteRepo.toggleFavorite).not.toHaveBeenCalled()
    })

    it('should throw if property does not exist', async () => {
        propertyRepo.getProperty.mockRejectedValue(new Error('Not found'))

        await expect(
            useCase.execute('non-existent-uuid', 'seeker-uuid')
        ).rejects.toThrow()
    })
})