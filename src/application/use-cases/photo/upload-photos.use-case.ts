import { IPhotoRepository } from "../../../domain/contracts/repositories/photo.repository.interface"
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface"
import { ICloudinaryService } from "../../../domain/contracts/services/cloudinary.service.interface"
import { PhotoEntity } from "../../../domain/entities/photo.entity"
import { CustomError } from "../../../domain/errors/custom-errors"


export interface IUploadPhotosUseCase {
    execute(propertyId: string, userId: string, files: Express.Multer.File[]): Promise<PhotoEntity[]>
}

export class UploadPhotosUseCase implements IUploadPhotosUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository,
        private readonly cloudinaryService: ICloudinaryService,
        private readonly photoRepository: IPhotoRepository
    ) { }

    async execute(propertyId: string, userId: string, files: Express.Multer.File[]): Promise<PhotoEntity[]> {
        const property = await this.propertyRepository.getProperty(propertyId)
        if (property.ownerId !== userId) throw CustomError.forbidden('Unauthorized')

        const hasPhotos = property.photos.length > 0

        const maxOrder = hasPhotos ? Math.max(...property.photos.map(p => p.order)) : -1

        const uploaded = await Promise.all(
            files.map((file, index) =>
                this.cloudinaryService.upload(file.buffer, `properties/${propertyId}`)
                    .then(({ url, publicId }) => ({
                        url,
                        publicId,
                        propertyId,
                        order: maxOrder + 1 + index
                    }))
            )
        )

        return this.photoRepository.createMany(uploaded)
    }
}