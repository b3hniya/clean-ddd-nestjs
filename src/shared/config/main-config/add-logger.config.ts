import { INestApplication } from '@nestjs/common';
import { WinstonLoggerService } from '../../logger/winston-logger.service';

export class LoggerConfig {
  public static AddTo(app: INestApplication<any>) {
    const logger = app.get(WinstonLoggerService);
    app.useLogger(logger);
  }
}
