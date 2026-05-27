import { EmailService } from "../infraestructure/services/mail/email.service";
import { ResendMailer } from "../infraestructure/services/mail/resend.mailer";


const resendMailer = new ResendMailer()
export const emailService = new EmailService(resendMailer)