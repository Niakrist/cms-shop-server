import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser()); // cookie-parser
  app.enableCors({
    origin: [process.env.CLIENT_URL], // Порт на который можно отправлять запросы
    credentils: true, // Так как работаем с серверными cookie
    exposedHeaders: 'set-cookie', // добавляет заголовок set-cookie для CORS
  });

  await app.listen(process.env.PORT || 5001);
}
bootstrap();
