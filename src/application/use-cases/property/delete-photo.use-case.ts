import { IPhotoRepository } from "../../../domain/contracts/repositories/photo.repository.interface"
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface"
import { ICloudinaryService } from "../../../domain/contracts/services/cloudinary.service.interface"
import { CustomError } from "../../../domain/errors/custom-errors"

export interface IDeletePhotoUseCase {
    execute(photoId: string, propertyId: string, userId: string): Promise<void>
}

export class DeletePhotoUseCase {
    constructor(
        private photoRepo: IPhotoRepository,
        private propertyRepo: IPropertyRepository,
        private cloudinaryService: ICloudinaryService
    ) { }

    async execute(photoId: string, propertyId: string, userId: string): Promise<void> {
        const property = await this.propertyRepo.getProperty(propertyId)

        if (property.ownerId !== userId) throw CustomError.forbidden('No autorizado')

        const photo = await this.photoRepo.findById(photoId)

        await this.cloudinaryService.delete(photo.publicId)
        await this.photoRepo.delete(photoId)
    }
}