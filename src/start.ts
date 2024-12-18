import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default async (app: INestApplication<any>) => {
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT'));

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`,
    'Bootstrap',
  );

  Logger.log(
    `📃 Swagger Doc on: http://localhost:${port}/swagger`,
    'Bootstrap',
  );
};
