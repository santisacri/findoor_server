import { IPhotoRepository } from "../../../domain/contracts/repositories/photo.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { ICloudinaryService } from "../../../domain/contracts/services/cloudinary.service.interface";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IDeletePropertyUseCase {
    execute(propertyId: string, userId: string): Promise<void>
}

export class DeletePropertyUseCase implements IDeletePropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository,
        private readonly photoRepository: IPhotoRepository,
        private readonly cloudinaryService: ICloudinaryService
    ) { }

    async execute(propertyId: string, userId: string): Promise<void> {
        const property = await this.propertyRepository.getProperty(propertyId)
        if (!property) throw CustomError.notFound('Propiedad no encontrada')
        if (property.ownerId !== userId) throw CustomError.forbidden('No autorizado')

        const photos = await this.photoRepository.findByPropertyId(propertyId)
        await this.cloudinaryService.deleteMany(photos.map(p => p.publicId))

        await this.propertyRepository.deleteProperty(propertyId)
    }

}