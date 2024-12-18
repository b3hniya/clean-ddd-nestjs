import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './shared/config/main-config/add-swagger.config';
import { ApiVersioning } from './shared/config/main-config/api-versioning.config';
import start from './start';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ApiVersioning.AddTo(app);
  SwaggerConfig.AddTo(app);

  start(app);
}
bootstrap();
