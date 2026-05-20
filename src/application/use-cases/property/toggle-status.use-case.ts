import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";

export interface IToggleStatusUseCase {
    execute(status: boolean, propertyId: string): Promise<PropertyEntity>
}

export class ToggleStatusUseCase implements IToggleStatusUseCase {


    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    execute(status: boolean, propertyId: string): Promise<PropertyEntity> {
        return this.propertyRepository.toggleStatus(status, propertyId)
    }

}