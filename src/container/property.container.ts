import { CreatePropertyUseCase } from "../application/use-cases/property/create-property.use-case";
import { PropertyController } from "../presentation/property/property.controller";
import { propertyRepository } from "./repositories.container";



const createPropertyUseCase = new CreatePropertyUseCase(propertyRepository)



export const propertyController = new PropertyController({ createPropertyUseCase })