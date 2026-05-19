import { IPropertyDatasource } from "../../domain/contracts/datasources/property.datasource.interface";
import { IPropertyRepository } from "../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../domain/entities/property.entity";
import { TCreateProperty } from "../../presentation/property/property.schemas";


export class PropertyRepository implements IPropertyRepository {

    constructor(
        private readonly propertyDatasource: IPropertyDatasource
    ) { }

    createProperty(data: TCreateProperty, userId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.create(data, userId)
    }
    getAllProperties(userId: string): Promise<PropertyEntity[]> {
        return this.propertyDatasource.getAllProperties(userId)
    }
    getProperty(userId: string, propertyId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.getProperty(userId, propertyId)
    }

}