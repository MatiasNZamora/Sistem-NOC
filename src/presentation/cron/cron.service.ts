import { CronJob } from 'cron';


type cronTime = string | Date;
type onTick = () => void;


export class CronService { 

    static createJob( cronTime:cronTime, onTick:onTick ):CronJob {
        const job = new CronJob(
            cronTime,
            // '*/2 * * * * *',

            onTick            
            // () => {
            //     const date = new Date();
            //     console.log('2 second', date);
            // },
        );

        job.start();
        return job;
    };
};



