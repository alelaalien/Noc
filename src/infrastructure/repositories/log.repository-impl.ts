import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevelEnum } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository{
     
    constructor(private readonly logDatasource : LogDatasource){

    }
    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog(log);
    }
    getLogs(severityLevel: LogServerityLevelEnum): Promise<LogEntity[]> {
        return this.logDatasource.getLogs(severityLevel);
    }

}