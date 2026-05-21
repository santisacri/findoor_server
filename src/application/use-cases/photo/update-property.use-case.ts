import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { CustomError } from "../../../domain/errors/custom-errors";
import { TUpdateProperty } from "../../../presentation/property/property.schemas";

export interface IUpdatePropertyUseCase {
    execute(data: TUpdateProperty, propertyId: string, userId: string): Promise<PropertyEntity>
}

export class UpdatePropertyUseCase implements IUpdatePropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    async execute(data: TUpdateProperty, propertyId: string, userId: string): Promise<PropertyEntity> {
        const property = await this.propertyRepository.getProperty(propertyId)

        if(property.ownerId !== userId) throw CustomError.forbidden('Unauthorized')

        return this.propertyRepository.updateProperty(data, propertyId)
    }

}