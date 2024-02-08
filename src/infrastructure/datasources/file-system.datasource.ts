import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevelEnum } from "../../domain/entities/log.entity";
import fs from 'fs';


export class FileSystemDatasource implements LogDatasource{

    private readonly path       = 'logs/';
    private readonly allPath    = 'logs/logs-all.log';
    private readonly mediumPath = 'logs/logs-medium.log';
    private readonly highPath   = 'logs/logs-high.log';

    constructor(){ this.createLogsFiles(); }

    private createLogsFiles = () =>{

        if(!fs.existsSync(this.path))
        {
            fs.mkdirSync(this.path);
        }

        [   
            this.allPath,
            this.mediumPath, 
            this.highPath

        ].forEach(path => {

            if(fs.existsSync(path)) return;

            fs.writeFileSync(path, ''); 
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        
        const LogAsJson = `${JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allPath, LogAsJson);

        if(newLog.level === LogServerityLevelEnum.low) return;

        if(newLog.level === LogServerityLevelEnum.medium){
            
            fs.appendFileSync(this.mediumPath, LogAsJson);

        }else{

            fs.appendFileSync(this.highPath, LogAsJson);

        } 
    }

    private getLogsFromFile = (path: string):LogEntity[] => {
        
        const content = fs.readFileSync(path, 'utf-8');
        // const  logs = content.split('\n').map(log => LogEntity.createFromJson(log));
        const  logs = content.split('\n').map(log => LogEntity.createFromJson(log));

        return logs;

    }

    async getLogs(severityLevel: LogServerityLevelEnum): Promise<LogEntity[]> {
        
        switch (severityLevel) {
            case LogServerityLevelEnum.low:
                return this.getLogsFromFile(this.allPath);
                   
                break;
            case LogServerityLevelEnum.medium:
                return this.getLogsFromFile(this.mediumPath); 
            
                break;
            case LogServerityLevelEnum.high:
                return this.getLogsFromFile(this.highPath);  
            
                break;
        
            default: throw new Error(`${severityLevel} not implemented`); break;
        }
    }

}