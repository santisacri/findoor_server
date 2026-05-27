
import { IEmailService } from "../../../domain/contracts/services/email.service.interface";
import { IMailer } from "../../../domain/contracts/services/mailer.interface";
import { envs } from "../../../env.schema";



export class EmailService implements IEmailService {

    constructor(
        private readonly mailer: IMailer
    ) { }


    async sendVerificationEmail(to: string, token: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/verify-email?token=${token}`
        const subject = `Verify your Findoor Account`
        const html = `<p>Click <a href="${url}">here</a> to verify your account.</p>`

        await this.mailer.send(to, subject, html)
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/reset-password?token=${token}`
        const subject = `Password reset`
        const html = `<p>Click <a href="${url}">here</a> to reset your password.</p>`

        await this.mailer.send(to, subject, html)
    }

}