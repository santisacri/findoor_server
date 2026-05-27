import { CreateLeadUseCase } from "../application/use-cases/contact-lead/create-lead.use-case";
import { GetOwnerLeadsUseCase } from "../application/use-cases/contact-lead/get-owner-leads.use-case";
import { MarkAsReadUseCase } from "../application/use-cases/contact-lead/mark-as-read.use-case";
import { LeadController } from "../presentation/property/lead.controller";
import { contactLeadRepository, propertyRepository } from "./repositories.container";


const createLeadUseCase = new CreateLeadUseCase(contactLeadRepository, propertyRepository)
const getOwnerLeadsUseCase = new GetOwnerLeadsUseCase(contactLeadRepository)
const markAsReadUseCase = new MarkAsReadUseCase(contactLeadRepository, propertyRepository)

export const leadController = new LeadController({ createLeadUseCase, getOwnerLeadsUseCase, markAsReadUseCase })