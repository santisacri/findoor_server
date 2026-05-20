import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../../domain/entities/property.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IToggleStatusUseCase {
    execute(status: boolean, propertyId: string, userId: string): Promise<PropertyEntity>
}

export class ToggleStatusUseCase implements IToggleStatusUseCase {


    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    async execute(status: boolean, propertyId: string, userId: string): Promise<PropertyEntity> {
        const property = await this.propertyRepository.getProperty(propertyId)

        if (property.ownerId !== userId) throw CustomError.forbidden('Unauthorized')

        return this.propertyRepository.toggleStatus(status, propertyId)
    }

}