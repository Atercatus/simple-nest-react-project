import { Module, Scope } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { TestModule } from '../Test/test.module';
import { TestService } from '../Test/test.service';

const mockTestService = {
  provide: 'TEST_SERVICE',
  useClass: TestService,
  scope: Scope.REQUEST,
};

@Module({
  imports: [UserModule, SessionModule, TestModule],
  controllers: [AuthController],
  providers: [AuthService, TestService],
  exports: [SessionModule],
})
export class AuthModule {}
