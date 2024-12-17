import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [UserModule, CqrsModule],
})
export class AppModule {}
