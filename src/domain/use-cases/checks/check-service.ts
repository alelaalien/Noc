import { LogEntity, LogServerityLevelEnum } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

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

            const lowLog = new LogEntity(
                `${url} working`,
            LogServerityLevelEnum.low
            );

            this.logRepository.saveLog(lowLog);
            
             this.success();

             return true;

                    
        }catch(err){

            this.error(`${err}`);

            const lowLog = new LogEntity(
                `${url} is not working`,
                LogServerityLevelEnum.low
            );

            this.logRepository.saveLog(lowLog);

            return false;
        }
        
    }
}