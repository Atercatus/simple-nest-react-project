import { Injectable, Scope, Inject } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../typeorm/entity/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { SessionService } from '../session/session.service';
import { generateUniqueId } from '../util/id-generator';
import { ElementDto } from '../session/dto/element.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  public async login(userDto: UserDto) {
    if (!(await this.isRegistered(userDto))) return;

    return this.serializeUser(userDto);
  }

  public async logout() {
    const sessionId = this.request.cookies.id;

    this.sessionService.delete(sessionId);
  }

  private async isRegistered(userDto: UserDto): Promise<boolean> {
    const user = await this.userService.findUser(userDto);
    return !!user;
  }

  private async serializeUser(userDto: UserDto): Promise<string> {
    const key = generateUniqueId();
    const value = userDto;

    const element = new ElementDto(key, value);
    this.sessionService.set(element);
    return key;
  }

  async createUser(userDto: UserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  async updateUser(userDto: UserDto) {
    return this.userService.updateUser(userDto);
  }
}
