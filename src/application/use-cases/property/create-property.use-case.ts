import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { TCreateProperty } from "../../../presentation/property/property.schemas";

export interface ICreatePropertyUseCase {
    execute(data: TCreateProperty, userId: string): Promise<PropertyEntity>
}

export class CreatePropertyUseCase implements ICreatePropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(data: TCreateProperty, userId: string): Promise<PropertyEntity> {
        return this.propertyRepository.createProperty(data, userId)
    }

}