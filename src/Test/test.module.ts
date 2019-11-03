import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../typeorm/entity/book.entity';
import { Author } from '../typeorm/entity/author.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
  providers: [TestService],
  exports: [TestService, TypeOrmModule.forFeature([Book, Author])],
  controllers: [TestController],
})
export class TestModule {}
