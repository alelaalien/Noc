import { LogEntity, LogServerityLevelEnum } from "../entities/log.entity";

export abstract class LogRepository{

    abstract saveLog(log: LogEntity) : Promise<void>;

    abstract getLogs(severityLevel: LogServerityLevelEnum): Promise<LogEntity[]>;
}