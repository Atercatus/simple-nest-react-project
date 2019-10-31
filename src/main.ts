import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare global {
  namespace Express {
    interface Request {
      user?: Object;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const PORT = process.env.PORT || 5050;
  await app.listen(PORT);
}
bootstrap();
