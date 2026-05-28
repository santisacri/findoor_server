import { IEmailService } from "../../../domain/contracts/services/email.service.interface";
import { IMailer } from "../../../domain/contracts/services/mailer.interface";
import { envs } from "../../../env.schema";
import { resetPasswordHTML, verifyAccountHTML } from "./html.templates";



export class EmailService implements IEmailService {

    constructor(
        private readonly mailer: IMailer
    ) { }


    async sendVerificationEmail(to: string, token: string, name: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/verify-email?token=${token}`
        const subject = `Verify your Findoor account`
        const html = verifyAccountHTML(name, url)

        await this.mailer.send(to, subject, html)
    }

    async sendPasswordResetEmail(to: string, token: string, name: string): Promise<void> {
        const url = `${envs.FRONTEND_URL}/reset-password?token=${token}`
        const subject = `Password reset`
        const html = resetPasswordHTML(name, url)

        await this.mailer.send(to, subject, html)
    }

}