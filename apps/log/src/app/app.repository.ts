import { Injectable } from '@nestjs/common';
import { Repository, LogEntity } from '@tms/common';

@Injectable()
export class AppRepository extends Repository<LogEntity> {
  constructor() {
    super(LogEntity);
  }

  public async create(data: any): Promise<LogEntity> {
    return this.model
      .create({
        logSid: data.logSid,
        logType: data.type,
        message: data.message,
        serviceSid: data.serviceSid,
        clientSid: data.clientSid,
        logDate: data.logDate,
        detail: data.detail,
      })
      .catch((error) => {
        throw error;
      });
  }
}
