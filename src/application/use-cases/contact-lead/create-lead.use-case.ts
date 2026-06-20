import { IContactLeadRepository } from "../../../domain/contracts/repositories/contact-lead.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { ContactLeadEntity } from "../../../domain/entities/contact-lead.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface ICreateLeadUseCase {
    execute(propertyId: string, senderId: string, message: string): Promise<void>
}

export class CreateLeadUseCase implements ICreateLeadUseCase {

    constructor(
        private readonly contactLeadRepo: IContactLeadRepository,
        private readonly propertyRepo: IPropertyRepository
    ) { }

    async execute(propertyId: string, senderId: string, message: string): Promise<void> {
        const property = await this.propertyRepo.getProperty(propertyId)

        if (!property.isActive) throw CustomError.badRequest('Property is not active')
        if (property.ownerId === senderId) throw CustomError.forbidden('Cannot create a lead to your own property')

        const leadExists = await this.contactLeadRepo.getLeadByPropertyAndSender(propertyId, senderId)
        if (leadExists) throw CustomError.badRequest('You already contacted the property owner')

        await this.contactLeadRepo.createLead(propertyId, senderId, message)
    }

}