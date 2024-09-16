import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const configService = new ConfigService();

  const serverUrl = configService.get<string>('SERVER_URL');
  const serverPort = configService.get<string>('SERVER_PORT');

  const webAppUrl = configService.get<string>('WEB_APP_URL');
  const webAppPort = configService.get<string>('WEB_APP_PORT');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      `${webAppUrl}:${webAppPort}`
    ],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(serverPort, () => {
    console.log(`Server running on ${serverUrl}:${serverPort}`);
  });
}
bootstrap();
