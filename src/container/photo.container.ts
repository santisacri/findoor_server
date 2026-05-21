import { UploadPhotosUseCase } from "../application/use-cases/photo/upload-photos.use-case"
import { DeletePhotoUseCase } from "../application/use-cases/property/delete-photo.use-case"
import { PhotoController } from "../presentation/property/photo.controller"
import { photoRepository, propertyRepository } from "./repositories.container"
import { cloudinaryService } from "./services.container"

const uploadPhotosUseCase = new UploadPhotosUseCase(propertyRepository, cloudinaryService, photoRepository)
const deletePhotoUseCase = new DeletePhotoUseCase(photoRepository, propertyRepository, cloudinaryService)

export const photoController = new PhotoController({ uploadPhotosUseCase, deletePhotoUseCase })