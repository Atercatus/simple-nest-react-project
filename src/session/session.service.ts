import { Injectable } from '@nestjs/common';
import { ElementDto } from './dto/element.dto';

@Injectable()
export class SessionService {
  private readonly session: Map<string, any>;

  constructor() {
    this.session = new Map<string, any>();
  }

  set(element: ElementDto): void {
    this.session.set(element.key, element.value);
    console.log(this.session);
  }

  get(element: ElementDto) {
    const result = this.session.get(element.key);
    console.log(result);
    return result;
  }
}
