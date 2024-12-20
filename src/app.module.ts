import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SurveyModule } from './modules/survey/survey.module';
import { ConfigModule } from './shared/config/config.module';
import { WinstonLoggerService } from './shared/logger/winston-logger.service';

import { HttpLoggerMiddleware } from './shared/logger/http-logger.middleware';

@Module({
  imports: [ConfigModule, SurveyModule, UserModule],
  providers: [WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*'); // Apply request logging
  }
}
