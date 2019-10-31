import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TestService {
  constructor(@Inject(REQUEST) private request: Request) {}
  test() {
    console.log('this.request.user:', this.request.user);
    console.log('this is custom provider');
  }
}
