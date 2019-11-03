import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../typeorm/entity/book.entity';
import { Author } from '../typeorm/entity/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @Inject(REQUEST)
    private request: Request,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  test() {
    console.log('pass the guard!');
  }

  async create() {
    const book = this.bookRepository.create({ name: 'book' });
    await this.bookRepository.save(book);
    const author = this.authorRepository.create({ name: 'author' });
    // this.authorRepository.save(author);
    author.books = [book];
    await this.authorRepository.save(author);
    const author2 = this.authorRepository.create({ name: 'author2' });
    await this.authorRepository.save(author2);

    // it doesn't work because author is owner
    // book.authors = [author, author2];
  }
}
