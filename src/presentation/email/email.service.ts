import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entitis';


interface SendEmailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string;
    attachments?: Attachment[];
};

interface Attachment {
    filename:string,
    path:string,
};

export class EmailService {

    constructor(){}


    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
    });


    async sendEmail(options:SendEmailOptions):Promise<Boolean>{
        
        const { to, subject, htmlBody, attachments=[] } = options;

        try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            return true;
        } catch (error) {

            return false;
        };
    };

    async sendEmailWithFileSystemLogs( to:string | string[] ){
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Log de sistema noc</h3>
        <p> ver logs adjuntos </p>
        `;

        const attachments:Attachment[] = [
            {filename: 'logs-all.log', path:'./logs/logs-all.log'},
            {filename: 'logs-high.log', path:'./logs/logs-high.log'},
            {filename: 'logs-medium.log', path:'./logs/logs-medium.log'},
        ];

        return this.sendEmail({
            to, subject, attachments, htmlBody
        });
    };
};