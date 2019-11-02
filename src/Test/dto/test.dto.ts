// // using hapy/joi
// export class TestDto {
//   constructor(readonly head: string, public readonly body: string | number) {}
// }

// using class-validator
import { IsString, IsNumberString } from 'class-validator';

export class TestDto {
  @IsString()
  readonly head: string;

  @IsNumberString()
  readonly body: string | number;
}
