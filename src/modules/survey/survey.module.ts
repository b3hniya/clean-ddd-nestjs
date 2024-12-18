import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserCreatedEventHandler } from './event-handler/user-created.handler';

@Module({
  imports: [CqrsModule], // CqrsModule provides EventBus and CommandBus
  providers: [
    // Command Handlers
    UserCreatedEventHandler
  ],
})
export class SurveyModule {}
