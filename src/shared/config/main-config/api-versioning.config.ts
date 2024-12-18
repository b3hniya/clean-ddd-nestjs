import { INestApplication, VersioningType } from '@nestjs/common';

export class ApiVersioning {
  public static AddTo(app: INestApplication<any>) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });
  }
}
