import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IGetOwnerPropertiesUseCase {
    execute(userId: string): Promise<PropertyEntity[]>
}

export class GetOwnerPropertiesUseCase implements IGetOwnerPropertiesUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(userId: string): Promise<PropertyEntity[]> {
        return this.propertyRepository.getOwnerProperties(userId)
    }

}