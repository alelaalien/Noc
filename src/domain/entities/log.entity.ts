export enum LogServerityLevelEnum {
    
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}

export interface ILogEntityOptions  {

    level: LogServerityLevelEnum;
    message:string;
    createdAt?: Date;
    origin: string;
}
export class LogEntity {

    public level: LogServerityLevelEnum;
    public message:string;
    public createdAt: Date;
    public origin: string;

    constructor(options : ILogEntityOptions){

        const {message, level, origin, createdAt = new Date()} = options; 
        this.message = message;
        this.level = level;
        this.createdAt = createdAt
        this.origin = origin;
        //tarea 004 min 2:045
    }

    static createFromJson = (json:string):LogEntity =>{

        const { level, message, createdAt, origin} = JSON.parse(json);
        const log = new LogEntity({
            message, level, createdAt, origin
        }); 

        return log;
    }
}