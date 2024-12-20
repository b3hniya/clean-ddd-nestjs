import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { WinstonLoggerService } from './winston-logger.service'; // Your logger implementation

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: WinstonLoggerService) {}

  use(req: Request, res: Response, next: () => void) {
    const { method, url, headers, body } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      this.logger.logRecord({
        message: 'HTTP Request/Response Log',
        context: 'HttpLogger',
        method,
        url,
        status: res.statusCode,
        duration: `${duration}ms`,
        headers,
        body,
        response: {
          headers: res.getHeaders(),
        },
      });
    });

    next();
  }
}
