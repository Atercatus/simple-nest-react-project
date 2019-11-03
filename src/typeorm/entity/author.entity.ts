import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(type => Book, book => book.name)
  @JoinTable({
    name: 'author_books',
    joinColumn: {
      name: 'book_name',
      referencedColumnName: 'name',
    },
    inverseJoinColumn: {
      name: 'author_name',
      referencedColumnName: 'name',
    },
  })
  books: Book[];
}
