import { ContactLeadEntity } from "../../entities/contact-lead.entity";

export interface IContactLeadDatasource {
    createLead(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity>
    getLeadsByOwner(ownerId: string): Promise<ContactLeadEntity[]>
    markAsRead(leadId: string): Promise<ContactLeadEntity>
    findById(leadId: string): Promise<ContactLeadEntity>
}