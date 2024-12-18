import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { SurveyModule } from './modules/survey/survey.module';
import { ConfigModule } from './shared/config/config.module';

@Module({
  imports: [ConfigModule, SurveyModule, UserModule, CqrsModule],
})
export class AppModule {}
