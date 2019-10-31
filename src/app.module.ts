import { Module, NestModule, MiddlewareConsumer, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeserializerMiddleware } from './core/middlewares/deserializer/deserializer.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeserializerMiddleware).forRoutes('*');
  }
}
