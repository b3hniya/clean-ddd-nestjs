import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { SurveyModule } from './modules/survey/survey.module';
import { EnvConfigModule } from './shared/config/app-module-config/env-config/env-config.module';
import { WinstonLoggerService } from './shared/config/app-module-config/logger/winston-logger.service';

import { HttpLoggerMiddleware } from './shared/config/app-module-config/logger/http-logger.middleware';
import { PrismaModule } from './shared/config/app-module-config/prisma/prisma.module';
import { SentryModule } from '@sentry/nestjs/setup';
import { CreateUserService } from './create-user/create-user.service';

@Module({
  imports: [
    EnvConfigModule,
    SurveyModule,
    UserModule,
    PrismaModule,
    SentryModule.forRoot(),
  ],
  providers: [WinstonLoggerService, CreateUserService],
  exports: [WinstonLoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*'); // Apply request logging
  }
}
