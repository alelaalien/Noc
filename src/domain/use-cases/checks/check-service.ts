import { LogEntity, LogServerityLevelEnum } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
// ywhn adfz afro ffuq 
interface ICheckService{
    execute(url: string) : Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements ICheckService{

    constructor(private readonly success: SuccessCallback,
                private readonly error: ErrorCallback,
                private readonly logRepository : LogRepository){
 

    }

    async execute(url: string) : Promise<boolean>{

        try{

           const result = await fetch(url);

            if(!result.ok) { throw new Error(`Error on check service at ${url}`);} 

            const lowLog = new LogEntity({
                message: `${url} working`,
                level: LogServerityLevelEnum.low, 
                origin: 'check-services.ts'
                } 
            );

            this.logRepository.saveLog(lowLog);
            
             this.success();

             return true;

                    
        }catch(err){

            this.error(`${err}`);

            const highLog = new LogEntity({
                message: `${url} is not working`,
                level: LogServerityLevelEnum.high, 
                origin: 'check-services.ts'
                } 
            );

            this.logRepository.saveLog(highLog);

            return false;
        }
        
    }
}