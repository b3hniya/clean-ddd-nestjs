// src/modules/user/user.module.ts

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/commands/create-user.handler';
import { UserInMemoryRepository } from './infrastructure/persistance/repositories/user.in-memory.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    // Command Handlers
    CreateUserHandler,

    // Repository Implementation
    {
      provide: 'UserRepositoryInterface',
      useClass: UserInMemoryRepository, // Temporary in-memory repository
    },
  ],
})
export class UserModule {}
