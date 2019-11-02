import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from '../../../session/session.service';

@Injectable()
export class DeserializerMiddleware implements NestMiddleware {
  constructor(private readonly sessionService: SessionService) {}
  use(req: Request, res: Response, next: Function) {
    const id = req.cookies.id;
    const userData = this.sessionService.get(id);

    req.user = userData;
    console.log('req.user:', req.user);

    next();
  }
}
