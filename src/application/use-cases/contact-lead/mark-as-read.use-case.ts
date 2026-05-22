import { IContactLeadRepository } from "../../../domain/contracts/repositories/contact-lead.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { ContactLeadEntity } from "../../../domain/entities/contact-lead.entity";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IMarkAsReadUseCase {
    execute(leadId: string, userId: string): Promise<ContactLeadEntity>
}

export class MarkAsReadUseCase implements IMarkAsReadUseCase {
    constructor(
        private readonly contactLeadRepo: IContactLeadRepository,
        private readonly propertyRepo: IPropertyRepository
    ) { }

    async execute(leadId: string, userId: string): Promise<ContactLeadEntity> {
        const lead = await this.contactLeadRepo.findById(leadId)
        const property = await this.propertyRepo.getProperty(lead.propertyId)

        if (property.ownerId !== userId) throw CustomError.forbidden('Not authorized')

        return this.contactLeadRepo.markAsRead(leadId)
    }
}