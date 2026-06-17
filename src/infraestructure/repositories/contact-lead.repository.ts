import { IContactLeadDatasource } from "../../domain/contracts/datasources/contact-lead.datasource.interface";
import { IContactLeadRepository } from "../../domain/contracts/repositories/contact-lead.repository.interface";
import { ContactLeadEntity } from "../../domain/entities/contact-lead.entity";


export class ContactLeadRepository implements IContactLeadRepository {

    constructor(
        private readonly contactLeadDatasource: IContactLeadDatasource
    ) { }


    getLeadByPropertyAndSender(propertyId: string, senderId: string): Promise<ContactLeadEntity | null> {
        return this.contactLeadDatasource.getLeadByPropertyAndSender(propertyId, senderId)
    }

    findById(leadId: string): Promise<ContactLeadEntity> {
        return this.contactLeadDatasource.findById(leadId)
    }

    getOwnerLeads(ownerId: string): Promise<ContactLeadEntity[]> {
        return this.contactLeadDatasource.getLeadsByOwner(ownerId)
    }

    markAsRead(leadId: string): Promise<ContactLeadEntity> {
        return this.contactLeadDatasource.markAsRead(leadId)
    }

    createLead(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity> {
        return this.contactLeadDatasource.createLead(propertyId, senderId, message)
    }

}