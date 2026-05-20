import { CreatePropertyUseCase } from "../application/use-cases/property/create-property.use-case";
import { GetAllPropertiesUseCase } from "../application/use-cases/property/get-all-properties.use-case";
import { GetPropertyUseCase} from "../application/use-cases/property/get-property.use-case";
import { PropertyController } from "../presentation/property/property.controller";
import { propertyRepository } from "./repositories.container";



const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository)
const getAllPropertiesUseCase = new GetAllPropertiesUseCase(propertyRepository)
const getPropertyUseCase = new GetPropertyUseCase(propertyRepository)



export const propertyController = new PropertyController({ createPropertyUseCase, getAllPropertiesUseCase, getPropertyUseCase })