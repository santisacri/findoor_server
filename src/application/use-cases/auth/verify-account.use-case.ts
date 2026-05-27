import { IUserRepository } from "../../../domain/contracts/repositories/user.repository.interface";

export interface IVerifyAccountUseCase {
    execute(token: string): Promise<void>
}


export class VerifyAccountUseCase implements IVerifyAccountUseCase {

    constructor(
        private readonly userRepo: IUserRepository
    ) { }

    async execute(token: string): Promise<void> {
        const user = await this.userRepo.findByVerificationToken(token)
        await this.userRepo.verifyUser(user.id)
    }

}