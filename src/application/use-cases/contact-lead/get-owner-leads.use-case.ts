import { IContactLeadRepository } from "../../../domain/contracts/repositories/contact-lead.repository.interface";
import { ContactLeadEntity } from "../../../domain/entities/contact-lead.entity";

export interface IGetOwnerLeadsUseCase {
    execute(ownerId: string): Promise<ContactLeadEntity[]>
}

export class GetOwnerLeadsUseCase implements IGetOwnerLeadsUseCase {

    constructor(
        private readonly contactLeadRepo: IContactLeadRepository
    ) { }

    execute(ownerId: string): Promise<ContactLeadEntity[]> {
        return this.contactLeadRepo.getOwnerLeads(ownerId)
    }

}