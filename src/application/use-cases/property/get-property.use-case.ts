import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IGetPropertyUseCase {
    execute(propertyId: string): Promise<PropertyEntity>
}

export class GetPropertyUseCase implements IGetPropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    async execute(propertyId: string): Promise<PropertyEntity> {
        const property = await this.propertyRepository.getProperty(propertyId)
        return property
    }

}