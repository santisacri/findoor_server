import { IContactLeadRepository } from "../../../domain/contracts/repositories/contact-lead.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { ContactLeadEntity } from "../../../domain/entities/contact-lead.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface ICreateLeadUseCase {
    execute(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity>
}

export class CreateLeadUseCase implements ICreateLeadUseCase {

    constructor(
        private readonly contactLeadRepo: IContactLeadRepository,
        private readonly propertyRepo: IPropertyRepository
    ) { }

    async execute(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity> {
        const property = await this.propertyRepo.getProperty(propertyId)

        if(!property.isActive) throw CustomError.badRequest('Property is not active')
        if(property.ownerId === senderId) throw CustomError.forbidden('Cannot create a lead to your own property')

        const lead = await this.contactLeadRepo.createLead(propertyId, senderId, message)

        return lead
    }

}