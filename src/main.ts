import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './shared/config/main-config/add-swagger.config';
import { ApiVersioning } from './shared/config/main-config/api-versioning.config';
import start from './start';
import { LoggerConfig } from './shared/config/main-config/add-logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  LoggerConfig.AddTo(app);
  ApiVersioning.AddTo(app);
  SwaggerConfig.AddTo(app);

  await start(app);
}

bootstrap();
