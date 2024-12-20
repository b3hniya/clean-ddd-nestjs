import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  public static AddTo(app: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle('Clean DDD NestJS API')
      .setDescription('API documentation for the Clean DDD NestJS project')
      .setVersion('1.0')
      .addServer('/', 'Version 1') // Add versioned endpoint
      .addBearerAuth() // Add JWT Bearer auth to Swagger
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document); // Swagger UI at /api
  }
}
