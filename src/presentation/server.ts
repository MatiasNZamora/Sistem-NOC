import { CheckServices } from "../domain/use-cases/checks/check.services";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";
import { FileSystemDataSorce } from "../infraestructure/datasorces/file-sistem.datasorce";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { MongoLogDatasource } from "../infraestructure/datasorces/mongo.datasource";

// creamos la instancias de las implementaciones para los useCases 

const logRepository = new LogRepositoryImpl( 
    // se agregan los distintos DataSorces 
    // new FileSystemDataSorce(),
    new MongoLogDatasource
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
        //             logRepository,
        //             () => console.log(`${ url } is OK`),
        //             (error) => console.log(`${error}`)
                
        //         ).execute(url);
        //     }
        // );

    };

};