import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModule as BaseModule } from '../user.module';

@Module({
  imports: [forwardRef(() => BaseModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
