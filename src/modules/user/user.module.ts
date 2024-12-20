import { Module } from '@nestjs/common';

import { CreateUserHandler } from './application/commands/create-user.handler';
import { GetUserByIdHandler } from './application/queries/get-user-by-id.handler';
import { UserCreatedEventHandler } from './application/event-handler/user-created.handler';
import { UserController } from './presentation/controllers/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './infrastructure/persistance/repositories/user.repository';
import { PrismaModule } from '../../shared/config/app-module-config/prisma/prisma.module';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UserController],
  providers: [
    CreateUserHandler, // Handlers are still listed here for DI
    GetUserByIdHandler,
    UserCreatedEventHandler,

    UserRepository,
  ],
  exports: [UserRepository],
})
export class UserModule {}
