import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value:', value);
    console.log('metadata: ', metadata);

    const ret = this.schema.validate(value);
    const error = ret.error;

    if (error) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }
}
