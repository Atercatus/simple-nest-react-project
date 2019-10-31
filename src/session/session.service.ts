import { Injectable } from '@nestjs/common';
import { ElementDto } from './dto/element.dto';
import { throwStatement } from '@babel/types';

@Injectable()
export class SessionService {
  private readonly session: Map<string, any>;

  constructor() {
    this.session = new Map<string, any>();
  }

  set(element: ElementDto): void {
    this.session.set(element.key, element.value);
  }

  get(key: string) {
    const result = this.session.get(key);
    return result;
  }

  delete(key: string) {
    console.log(this.session);
    this.session.delete(key);
    console.log(this.session);
  }
}
