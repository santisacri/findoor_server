import { TCreateProperty, TGetProperties, TUpdateProperty } from "../../../presentation/property/property.schemas";
import { PropertyEntity } from "../../entities/property.entity";

export interface IPropertyRepository {
    createProperty(data: TCreateProperty, userId: string): Promise<PropertyEntity>
    getAllProperties(filters: TGetProperties): Promise<{ properties: PropertyEntity[], total: number }>
    getOwnerProperties(userId: string): Promise<PropertyEntity[]>
    getProperty(propertyId: string): Promise<PropertyEntity>
    countByOwner(ownerId: string): Promise<number>
    updateProperty(data: TUpdateProperty, propertyId: string): Promise<PropertyEntity>
    toggleStatus(status: boolean, propertyId: string): Promise<PropertyEntity>
    deleteProperty(propertyId: string): Promise<PropertyEntity>
}