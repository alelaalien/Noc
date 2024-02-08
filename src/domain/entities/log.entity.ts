export enum LogServerityLevelEnum {
    
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}


export class LogEntity {

    public level: LogServerityLevelEnum;
    public message:string;
    public createdAt: Date;

    constructor(message: string, level : LogServerityLevelEnum){

        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static createFromJson = (json:string):LogEntity =>{

        const { level, message, createdAt} = JSON.parse(json);
        const log = new LogEntity(level, message);
        log.createdAt = new Date(createdAt);

        return log;
    }
}