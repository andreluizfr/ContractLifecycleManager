import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './utils/exception/http-exception.filter';
import { AllExceptionsFilter } from './utils/exception/all-exception.filter';

async function bootstrap() {

  const configService = new ConfigService();

  const serverUrl = configService.get<string>('SERVER_URL');
  const serverPort = configService.get<string>('SERVER_PORT');

  const webAppUrl = configService.get<string>('WEB_APP_URL');
  const webAppPort = configService.get<string>('WEB_APP_PORT');

  const app = await NestFactory.create(AppModule, {
    snapshot: true
  });

  app.enableCors({
    origin: [
      `${webAppUrl}:${webAppPort}`,
      `localhost:${webAppPort}`,
      `127.0.0.1:${webAppPort}`,
      `http://contratual.kinghost.net:${webAppPort}`,
      `http://contratual.com:${webAppPort}`,
      `http://contratual.com`
    ],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
      'Access-Control-Expose-Headers',
      'Authorization',
      'Accept',
      'Content-Type',
      'Referer',
      'User-Agent',
      'Content-Length',
      'Content-Encoding'
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());


  await app.listen(serverPort, () => {
    console.log(`Server running on ${serverUrl}:${serverPort}`);
  });
}
bootstrap();
