import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IGetPropertyUseCase {
    execute(propertyId: string, userId: string): Promise<PropertyEntity>
}

export class GetPropertyUseCase implements IGetPropertyUseCase {

    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    async execute(propertyId: string, userId: string): Promise<PropertyEntity> {
        const property = await this.propertyRepository.getProperty(propertyId)

        if(property.ownerId !== userId) throw CustomError.forbidden('Unauthorized')

        return property
    }

}