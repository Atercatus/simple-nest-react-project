import {
  Controller,
  UseGuards,
  Get,
  Post,
  UsePipes,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorizationGuard } from '../core/guards/authorization/authorization.guard';
import { Roles } from '../core/guards/authorization/roles.decorator';
import { TestService } from './test.service';
import { ValidationPipe } from '../core/pipes/validation.pipe';
import { testSchema } from './dto/test.schema';
import { TestDto } from './dto/test.dto';
import { CustomException } from '../core/exceptions/custom.exception';
import { CustomFilter } from '../core/filters/custom.filter';
import { LoggingInterceptor } from '../core/interceptors/loggin.interceptor';

@Controller('test')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthorizationGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @Roles('admin')
  get() {
    this.testService.test();
  }

  // using hapi/joi
  // @Post()
  // @Roles('admin')
  // @UsePipes(new ValidationPipe(testSchema))
  // post(@Body() testDto: TestDto) {
  //   console.log(testDto);
  // }

  @Post()
  @Roles('admin')
  // @UsePipes(ValidationPipe) // you can do this
  @UseFilters(CustomFilter)
  post(@Body(ValidationPipe) testDto: TestDto) {
    console.log(testDto);
    // throw new CustomException();
    return testDto;
  }
}
