import {
  // PipeTransform<T, R> is a generic interface
  // in which T indicates the type of the input value,
  // and R indicates the return type of the transform() method.
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    console.log(metatype);
    if (!metadata || !this.toValidate(metatype)) {
      console.log('first pass');
      return value;
    }

    const object = plainToClass(metatype, value); // object => class
    const errors = await validate(object);
    console.log(errors);

    if (errors.length) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    console.log(types);
    console.log(types.includes(metatype));
    return !types.includes(metatype);
  }
}

// // using hapi/joi
// import { ObjectSchema } from '@hapi/joi';

// @Injectable()
// export class ValidationPipe implements PipeTransform {
//   constructor(private readonly schema: ObjectSchema) {}

//   transform(value: any, metadata: ArgumentMetadata) {
//     console.log('value:', value);
//     console.log('metadata: ', metadata);

//     const ret = this.schema.validate(value);
//     const error = ret.error;

//     if (error) {
//       throw new BadRequestException('Validation failed');
//     }

//     return value;
//   }
// }
