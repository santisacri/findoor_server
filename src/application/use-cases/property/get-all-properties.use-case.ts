import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IGetAllPropertiesUseCase {
    execute(userId: string): Promise<PropertyEntity[]>
}

export class GetAllPropertiesUseCase implements IGetAllPropertiesUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(userId: string): Promise<PropertyEntity[]> {
        return this.propertyRepository.getAllProperties(userId)
    }

}