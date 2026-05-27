import { NextFunction, Request, Response } from "express"
import { ICreateLeadUseCase } from "../../application/use-cases/contact-lead/create-lead.use-case"
import { IGetOwnerLeadsUseCase } from "../../application/use-cases/contact-lead/get-owner-leads.use-case"
import { IMarkAsReadUseCase } from "../../application/use-cases/contact-lead/mark-as-read.use-case"

interface UseCases {
    createLeadUseCase: ICreateLeadUseCase,
    getOwnerLeadsUseCase: IGetOwnerLeadsUseCase,
    markAsReadUseCase: IMarkAsReadUseCase
}

export class LeadController {

    constructor(
        private useCases: UseCases
    ) { }


    createLead = async (req: Request, res: Response, next: NextFunction) => {
        const { message } = req.body
        const { id } = req.user!
        const { propertyId } = req.params
        try {
            const lead = await this.useCases.createLeadUseCase.execute(propertyId as string, id, message)

            res.status(201).json({ lead })
        } catch (error) {
            next(error)
        }
    }

    getLeads = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        try {
            const leads = await this.useCases.getOwnerLeadsUseCase.execute(id)

            res.json({ leads })
        } catch (error) {
            next(error)
        }
    }

    markAsRead = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.user!
        const { leadId } = req.params
        try {
            const lead = await this.useCases.markAsReadUseCase.execute(leadId as string, id)

            res.json({ lead })
        } catch (error) {
            next(error)
        }
    }
}