import { Controller, Post, Body, Get, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { User } from '../typeorm/entity/user.entity';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const id = await this.authService.login(userDto);

    if (id) res.cookie('id', id);
    return res.send();
  }

  // @Post()
  // async createUser(@Body() userDto: UserDto): Promise<User> {
  //   return this.authService.createUser(userDto);
  // }

  @Patch()
  async updateUser(@Body() userDto: UserDto) {
    return this.authService.updateUser(userDto);
  }
}
