import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthorizationGuard } from '../core/guards/authorization/authorization.guard';
import { Roles } from '../core/guards/authorization/roles.decorator';
import { TestService } from './test.service';

@Controller('test')
@UseGuards(AuthorizationGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @Roles('admin')
  get() {
    this.testService.test();
  }
}
