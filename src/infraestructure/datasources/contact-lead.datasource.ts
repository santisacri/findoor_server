import { PrismaClient } from "../../../generated/prisma/client"
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
                data: { propertyId, senderId, message },
                include: { sender: { select: { name: true } } },

            })

            return ContactLeadEntity.fromObject({ ...newLead, senderName: newLead.sender.name })
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getLeadsByOwner(ownerId: string): Promise<ContactLeadEntity[]> {
        try {
            const leads = await this.prisma.contactLead.findMany({
                where: { property: { ownerId } },
                include: { sender: { select: { name: true } } },
                orderBy: { createdAt: 'desc' }
            })

            type LeadWithSender = typeof leads[0]

            return leads.map((lead: LeadWithSender) => ContactLeadEntity.fromObject({ senderName: lead.sender.name, ...lead }))
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async getLeadByPropertyAndSender(propertyId: string, senderId: string): Promise<ContactLeadEntity | null> {
        try {
            const lead = await this.prisma.contactLead.findFirst({
                where: { propertyId, senderId },
                include: { sender: { select: { name: true } } },
            })

            if (!lead) return null

            return { ...lead, senderName: lead.sender.name }
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async findById(leadId: string): Promise<ContactLeadEntity> {
        try {
            const lead = await this.prisma.contactLead.findUniqueOrThrow({
                where: { id: leadId },
                include: { sender: { select: { name: true } } },
            })

            return { ...lead, senderName: lead.sender.name }
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

    async markAsRead(leadId: string): Promise<ContactLeadEntity> {
        try {
            const lead = await this.prisma.contactLead.update({
                where: { id: leadId },
                include: { sender: { select: { name: true } } },
                data: { isRead: true }
            })

            return { ...lead, senderName: lead.sender.name }
        } catch (error) {
            throw CustomError.fromPrisma(error)
        }
    }

}