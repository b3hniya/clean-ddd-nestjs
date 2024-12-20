import { Module } from '@nestjs/common';

import { CreateUserHandler } from './application/commands/create-user.handler';
import { GetUserByIdHandler } from './application/queries/get-user-by-id.handler';
import { UserCreatedEventHandler } from './application/event-handler/user-created.handler';
import { UserController } from './presentation/controllers/user.controller';
import { USER_REPOSITORY } from './infrastructure/persistance/repositories/user.repository.interface';
import { UserInMemoryRepository } from './infrastructure/persistance/repositories/user.in-memory.repository';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    CreateUserHandler, // Handlers are still listed here for DI
    GetUserByIdHandler,
    UserCreatedEventHandler,
    {
      provide: USER_REPOSITORY,
      useClass: UserInMemoryRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
