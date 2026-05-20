import { TCreateProperty } from "../../../presentation/property/property.schemas";
import { PropertyEntity } from "../../entities/property.entity";

export interface IPropertyRepository {
    createProperty(data: TCreateProperty, userId: string): Promise<PropertyEntity>
    getAllProperties(userId: string): Promise<PropertyEntity[]>
    getProperty(propertyId: string): Promise<PropertyEntity>
}