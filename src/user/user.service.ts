import { Injectable } from '@nestjs/common';
import { User } from '../typeorm/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser() {
    return this.userRepository.find();
  }
}
