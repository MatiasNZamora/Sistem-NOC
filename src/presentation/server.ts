import { CronService } from "./cron/cron.service";
import { CheckServices } from "../domain/use-cases/checks/check.services";




export class Server {

    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'https://google.com';
                
                new CheckServices(
                    () => console.log(`${ url } is OK`),
                    (error) => console.log(`${error}`)
                
                ).execute(url);
                // new CheckServices().execute('http://localhost:3000');
            }
        );

    };

};