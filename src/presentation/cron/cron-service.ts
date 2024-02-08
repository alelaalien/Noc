import {CronJob} from 'cron';

type cronTime = string | Date;
type OnTick = () => void;

export class CronService{

    static createJob(cronTime: cronTime, OnTick: OnTick): CronJob{

        const job = new CronJob( cronTime, OnTick );
        job.start();
        job.stop();
        return job;
    }
}