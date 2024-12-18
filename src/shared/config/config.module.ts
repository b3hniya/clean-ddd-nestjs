import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envValidationSchema } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Makes the config available everywhere
      envFilePath: ['.env'], // Load env files
      validationSchema: envValidationSchema, // Validate env variables using Joi
    }),
  ],
})
export class ConfigModule {}
