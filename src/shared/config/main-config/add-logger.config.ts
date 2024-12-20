import { INestApplication } from '@nestjs/common';
import { WinstonLoggerService } from '../app-module-config/logger/winston-logger.service';

export class LoggerConfig {
  public static AddTo(app: INestApplication<any>) {
    const logger = app.get(WinstonLoggerService);
    app.useLogger(logger);
  }
}
