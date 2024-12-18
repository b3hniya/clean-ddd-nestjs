import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { UserInMemoryRepository } from './infrastructure/persistance/repositories/user.in-memory.repository';
import { UserController } from './presentation/controllers/user.controller';
import { USER_REPOSITORY } from './infrastructure/persistance/repositories/user.repository.interface';
import { GetUserByIdHandler } from './application/queries/get-user-by-id.handler';
import { UserCreatedEventHandler } from './application/event-handler/user-created.handler';

@Module({
  imports: [CqrsModule], // CqrsModule provides EventBus and CommandBus
  controllers: [UserController],
  providers: [
    // Command Handlers
    CreateUserHandler,
    GetUserByIdHandler,
    UserCreatedEventHandler,

    // Repository
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
    },
  ],

  exports: [USER_REPOSITORY],
})
export class UserModule {}
