import { CreatePropertyUseCase } from "../application/use-cases/property/create-property.use-case";
import { DeletePropertyUseCase } from "../application/use-cases/property/delete-property.use-case";
import { GetOwnerPropertiesUseCase } from "../application/use-cases/property/get-owner-properties.use-case";
import { GetPropertyUseCase } from "../application/use-cases/property/get-property.use-case";
import { ToggleStatusUseCase } from "../application/use-cases/property/toggle-status.use-case";
import { UpdatePropertyUseCase } from "../application/use-cases/property/update-property.use-case";
import { PropertyController } from "../presentation/property/property.controller";
import { photoRepository, propertyRepository } from "./repositories.container";
import { cloudinaryService } from "./services.container";
import { GetAllPropertiesUseCase } from "../application/use-cases/property/get-all-properties.use-case";


const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository)
const getOwnerPropertiesUseCase = new GetOwnerPropertiesUseCase(propertyRepository)
const getAllPropertiesUseCase = new GetAllPropertiesUseCase(propertyRepository)
const getPropertyUseCase = new GetPropertyUseCase(propertyRepository)
const updatePropertyUseCase = new UpdatePropertyUseCase(propertyRepository)
const deletePropertyUseCase = new DeletePropertyUseCase(propertyRepository, photoRepository, cloudinaryService)
const toggleStatusUseCase = new ToggleStatusUseCase(propertyRepository)

export const propertyController = new PropertyController({
    createPropertyUseCase,
    getOwnerPropertiesUseCase,
    getPropertyUseCase,
    updatePropertyUseCase,
    deletePropertyUseCase,
    toggleStatusUseCase,
    getAllPropertiesUseCase
})