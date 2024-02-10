import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron-service";

// instancias

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);


export class Server{

    static start(){

        console.log('Server started...');

        const time = '*/2 * * * * *';

        const url = "https://google.com";

        CronService.createJob(time, ()=>{

            console.log('running');
            new CheckService(
               
                ()=> console.log('ok'),
                ()=> console.log('no ok'),
                fileSystemRepository

            ).execute(url);

        });
    }
}