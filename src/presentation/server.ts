import { CronService } from "./cron/cron.service";
import { CheckServices } from "../domain/use-cases/checks/check.services";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { FileSystemDataSorce } from "../infraestructure/datasorces/file-sistem.datasorce";
import { EmailService } from "./email/email.service";

// creamos la instancias de las implementaciones para los useCases 

const fileSystemLogRepository = new LogRepositoryImpl( 
    // se agregan los distintos DataSorces 
    new FileSystemDataSorce(),
);

const emailService = new EmailService();


export class Server {

    public static start(){
        console.log('Server started...');

        // Mandar email
        // new SendEmailLogs( emailService, fileSystemLogRepository)
        // .execute(['devmatiasnzamora@gmail.com','nikoozamora93@gmail.com' ]);

        // CronService.createJob(
        //     '*/5 * * * * *', 
        //     () => {
        //         const url = 'https://google.com';
        //         // const url = 'http://localhost:3000';
        //         new CheckServices(
        //             fileSystemLogRepository,
        //             () => console.log(`${ url } is OK`),
        //             (error) => console.log(`${error}`)
                
        //         ).execute(url);
        //         // new CheckServices().execute('http://localhost:3000');
        //     }
        // );

    };

};