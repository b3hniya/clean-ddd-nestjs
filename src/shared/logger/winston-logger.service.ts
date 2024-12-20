import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private readonly generalLogger: winston.Logger; // For general-purpose logging
  private readonly recordLogger: winston.Logger; // For record-specific logging

  constructor() {
    // General Logger: Includes console and file logging
    this.generalLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new DailyRotateFile({
          dirname: 'logs/general',
          filename: 'general-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
        }),
      ],
    });

    // Record Logger: Excludes console, logs only to file and ELK
    const recordTransports: winston.transport[] = [
      new DailyRotateFile({
        dirname: 'logs/records',
        filename: 'records-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
      }),
    ];

    if (process.env.LOG_TO_ELK === 'true') {
      recordTransports.push(
        new transports.Http({
          host: process.env.ELK_HOST,
          port: Number(process.env.ELK_PORT),
          path: '/_bulk',
          ssl: process.env.ELK_USE_SSL === 'true',
        }),
      );
    }

    this.recordLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: recordTransports,
    });
  }

  // General-purpose logging
  log(message: string, context?: string) {
    this.generalLogger.info({ message, context });
  }

  error(message: string, trace?: string, context?: string) {
    this.generalLogger.error({ message, trace, context });
  }

  warn(message: string, context?: string) {
    this.generalLogger.warn({ message, context });
  }

  debug(message: string, context?: string) {
    this.generalLogger.debug({ message, context });
  }

  verbose(message: string, context?: string) {
    this.generalLogger.verbose({ message, context });
  }

  // Record-specific logging
  logRecord(info: Record<string, any>) {
    this.recordLogger.info(info);
  }

  errorRecord(info: Record<string, any>) {
    this.recordLogger.error(info);
  }
}
