import { Module } from '@nestjs/common';
import { DBAuthModule } from './auth/auth.module';
import { DBClientModule } from './client/client.module';
import { DBProductModule } from './product/product.module';
import { DBLogModule } from './log/log.module';

@Module({
  imports: [DBAuthModule, DBClientModule, DBProductModule, DBLogModule],
})
export class DatabaseModule {}
