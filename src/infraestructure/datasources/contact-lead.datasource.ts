import { PrismaClient } from "../../../generated/prisma/client";
import { IContactLeadDatasource } from "../../domain/contracts/datasources/contact-lead.datasource.interface";
import { ContactLeadEntity } from "../../domain/entities/contact-lead.entity";
import { CustomError } from "../../domain/errors/custom-errors";


export class ContactLeadDatasource implements IContactLeadDatasource {

    constructor(
        private readonly prisma: PrismaClient
    ) { }


    async createLead(propertyId: string, senderId: string, message: string): Promise<ContactLeadEntity> {
        try {
            const newLead = await this.prisma.contactLead.create({
                data: { propertyId, senderId, message }
            })

            return ContactLeadEntity.fromObject(newLead)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getLeadsByOwner(ownerId: string): Promise<ContactLeadEntity[]> {
        try {
            const leads = await this.prisma.contactLead.findMany({
                where: { property: { ownerId } }
            })

            return leads.map(ContactLeadEntity.fromObject)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getLeadByPropertyAndSender(propertyId: string, senderId: string): Promise<ContactLeadEntity | null> {
        try {
            const lead = await this.prisma.contactLead.findFirst({
                where: {propertyId, senderId}
            })

            return lead
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async findById(leadId: string): Promise<ContactLeadEntity> {
        try {
            const lead = await this.prisma.contactLead.findUniqueOrThrow({
                where: { id: leadId }
            })

            return ContactLeadEntity.fromObject(lead)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async markAsRead(leadId: string): Promise<ContactLeadEntity> {
        try {
            const lead = await this.prisma.contactLead.update({
                where: { id: leadId },
                data: { isRead: true }
            })

            return ContactLeadEntity.fromObject(lead)
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

}