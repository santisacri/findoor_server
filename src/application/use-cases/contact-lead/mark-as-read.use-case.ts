import { IContactLeadRepository } from "../../../domain/contracts/repositories/contact-lead.repository.interface";
import { IPropertyRepository } from "../../../domain/contracts/repositories/property.repository.interface";
import { CustomError } from "../../../domain/errors/custom-errors";

export interface IMarkAsReadUseCase {
    execute(leadId: string, userId: string): Promise<void>
}

export class MarkAsReadUseCase implements IMarkAsReadUseCase {
    constructor(
        private readonly contactLeadRepo: IContactLeadRepository,
        private readonly propertyRepo: IPropertyRepository
    ) { }

    async execute(leadId: string, userId: string): Promise<void> {
        const lead = await this.contactLeadRepo.findById(leadId)
        const property = await this.propertyRepo.getProperty(lead.propertyId)

        if (property.ownerId !== userId) throw CustomError.forbidden('Not authorized')
        if (lead.isRead) throw CustomError.badRequest('this lead is already read')

        await this.contactLeadRepo.markAsRead(leadId)
    }
}