import { ContactLeadEntity } from "../../entities/contact-lead.entity";

export interface IContactLeadRepository {
    getOwnerLeads(ownerId: string): Promise<ContactLeadEntity[]>
    markAsRead(leadId: string): Promise<ContactLeadEntity>
    createLead(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity>
    findById(leadId: string): Promise<ContactLeadEntity>
}