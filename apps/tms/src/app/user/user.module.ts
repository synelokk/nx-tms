import { forwardRef, Module } from '@nestjs/common';
import { UserModule as UserModuleV1 } from './v1/user.module';
import { UserRepository } from './user.repository';
import { ClientUserRepository } from '@tms/common';

@Module({
  imports: [forwardRef(() => UserModuleV1)],
  providers: [UserRepository, ClientUserRepository],
  exports: [UserRepository, ClientUserRepository],
})
export class UserModule {}
