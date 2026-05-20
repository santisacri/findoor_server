import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IDeletePropertyUseCase {
    execute(propertyId: string): Promise<PropertyEntity>
}

export class DeletePropertyUseCase implements IDeletePropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(propertyId: string): Promise<PropertyEntity> {
        return this.propertyRepository.deleteProperty(propertyId)
    }

}