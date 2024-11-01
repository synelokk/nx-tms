import { forwardRef, Module } from '@nestjs/common';
import { ClientModule as BaseModule } from '../client.module';
import { ClientController } from './client.controller';
import { ClientService as ClientServiceV2 } from './client.service';

@Module({
  imports: [forwardRef(() => BaseModule)],
  controllers: [ClientController],
  providers: [ClientServiceV2],
})
export class ClientModule {}
