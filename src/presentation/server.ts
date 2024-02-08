import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server{

    static start(){

        console.log('Server started...');

        const time = '*/2 * * * * *';

        const url = "https://google.com";

        CronService.createJob(time, ()=>{

            console.log('running');
            new CheckService(
                ()=> console.log('ok'),
                ()=> console.log('no ok')

            ).execute(url);

        });
    }
}