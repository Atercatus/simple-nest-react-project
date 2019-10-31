import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '../typeorm/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(userDto: UserDto): Promise<User> {
    return this.userRepository.findOne(userDto);
  }

  async createUser(userDto: UserDto) {
    try {
      const user = this.userRepository.create(userDto);
      const result = await this.userRepository.insert(user);
      return user;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async updateUser(userDto: UserDto) {
    try {
      this.userRepository.update(1, userDto);
      return;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
