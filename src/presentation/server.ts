import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";
import { FileSystemDataSorce } from "../infraestructure/datasorces/file-sistem.datasorce";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { MongoLogDatasource } from "../infraestructure/datasorces/mongo.datasource";
import { PostgresLogDataSource } from "../infraestructure/datasorces/postgres-logs.datasource";
import { CheckServicesMultiple } from "../domain/use-cases/checks/check.services-multiple";

// creamos la instancias de las implementaciones para los useCases 

const fsLogRepository = new LogRepositoryImpl( 
    // se agregan los distintos DataSorces 
    new FileSystemDataSorce(),
);

const mongoLogRepository = new LogRepositoryImpl( 
    // se agregan los distintos DataSorces 
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl( 
    // se agregan los distintos DataSorces 
    new PostgresLogDataSource(),
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
        //         new CheckServicesMultiple(
        //             [
        //                 fsLogRepository, 
        //                 mongoLogRepository, 
        //                 postgresLogRepository
        //             ],
        //             () => console.log(`${ url } is OK`),
        //             (error) => console.log(`${error}`)
                
        //         ).execute(url);
        //     }
        // );

    };

};