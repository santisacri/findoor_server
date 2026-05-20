import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IGetPropertyUseCase {
    execute(propertyId: string): Promise<PropertyEntity>
}

export class GetPropertyUseCase implements IGetPropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(propertyId: string): Promise<PropertyEntity> {
        return this.propertyRepository.getProperty(propertyId)
    }

}