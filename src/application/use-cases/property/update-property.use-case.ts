import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { TUpdateProperty } from "../../../presentation/property/property.schemas";

export interface IUpdatePropertyUseCase {
    execute(data: TUpdateProperty, propertyId: string): Promise<PropertyEntity>
}

export class UpdatePropertyUseCase implements IUpdatePropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(data: TUpdateProperty, propertyId: string): Promise<PropertyEntity> {
        return this.propertyRepository.updateProperty(data, propertyId)
    }

}