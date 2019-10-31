import { Controller, Post, Body, Get, Patch, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  logout(@Res() response: Response): Response {
    this.authService.logout();

    response.cookie('id', '', { expires: new Date(Date.now()) });
    return response.send();
  }

  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Res() response: Response,
  ): Promise<Response> {
    const id = await this.authService.login(userDto);

    if (id) response.cookie('id', id);
    return response.send();
  }

  @Patch()
  async updateUser(@Body() userDto: UserDto) {
    return this.authService.updateUser(userDto);
  }
}
