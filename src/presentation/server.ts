import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository-impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// instancias

const fileSystemRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server{

    static start(){

        console.log('Server started...');
 
            emailService.sendEmailWithFileSystemLogs(
              ['alelaalien@gmail.com','camilowilches9@gmail.com']
            );
         
        // const time = '*/2 * * * * *';

        // const url = "https://google222222222222222.com";

        // CronService.createJob(time, ()=>{

        //     console.log('running');
        //     new CheckService(
               
        //         ()=> console.log('ok'),
        //         ()=> console.log('no ok'),
        //         fileSystemRepository

        //     ).execute(url);

        // });
    }
}