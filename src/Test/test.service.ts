import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class TestService {
  constructor(@Inject(REQUEST) private request: Request) {}
  test() {
    console.log('pass the guard!');
  }
}
