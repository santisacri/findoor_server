import { CreatePropertyUseCase } from "../application/use-cases/property/create-property.use-case";
import { DeletePhotoUseCase } from "../application/use-cases/property/delete-photo.use-case";
import { DeletePropertyUseCase } from "../application/use-cases/property/delete-property.use-case";
import { GetAllPropertiesUseCase } from "../application/use-cases/property/get-all-properties.use-case";
import { GetPropertyUseCase } from "../application/use-cases/property/get-property.use-case";
import { ToggleStatusUseCase } from "../application/use-cases/property/toggle-status.use-case";
import { UpdatePropertyUseCase } from "../application/use-cases/photo/update-property.use-case";
import { UploadPhotosUseCase } from "../application/use-cases/photo/upload-photos.use-case";
import { PropertyController } from "../presentation/property/property.controller";
import { photoRepository, propertyRepository } from "./repositories.container";
import { cloudinaryService } from "./services.container";


const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository)
const getAllPropertiesUseCase = new GetAllPropertiesUseCase(propertyRepository)
const getPropertyUseCase = new GetPropertyUseCase(propertyRepository)
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyRepository)
const deletePropertyUseCase = new DeletePropertyUseCase(propertyRepository, photoRepository, cloudinaryService)
const toggleStatusUseCase = new ToggleStatusUseCase(propertyRepository)

export const propertyController = new PropertyController({
    createPropertyUseCase,
    getAllPropertiesUseCase,
    getPropertyUseCase,
    updatePropertyUseCase,
    deletePropertyUseCase,
    toggleStatusUseCase
})