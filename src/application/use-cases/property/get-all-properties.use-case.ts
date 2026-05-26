import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { TGetProperties } from "../../../presentation/property/property.schemas";

export interface IGetAllPropertiesUseCase {
    execute(filters: TGetProperties): Promise<{ properties: PropertyEntity[]; total: number; }>
}

export class GetAllPropertiesUseCase implements IGetAllPropertiesUseCase {

    constructor(
        private readonly propertyRepo: IPropertyRepository
    ) { }

    execute(filters: TGetProperties): Promise<{ properties: PropertyEntity[]; total: number; }> {
        return this.propertyRepo.getAllProperties(filters)
    }

}