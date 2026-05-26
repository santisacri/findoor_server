import { IPropertyDatasource } from "../../domain/contracts/datasources/property.datasource.interface";
import { IPropertyRepository } from "../../domain/contracts/repositories/property.repository.interface";
import { PropertyEntity } from "../../domain/entities/property.entity";
import { TCreateProperty, TUpdateProperty } from "../../presentation/property/property.schemas";


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

    getProperty(propertyId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.getProperty(propertyId)
    }

    countByOwner(ownerId: string): Promise<number> {
        return this.propertyDatasource.countByOwner(ownerId)
    }

    updateProperty(data: TUpdateProperty, propertyId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.update(data, propertyId)
    }

    toggleStatus(status: boolean, propertyId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.toggleStatus(status, propertyId)
    }

    deleteProperty(propertyId: string): Promise<PropertyEntity> {
        return this.propertyDatasource.delete(propertyId)
    }
    
}