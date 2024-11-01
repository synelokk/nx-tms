import { forwardRef, Module } from '@nestjs/common';
import { ClientModule as BaseModule } from '../client.module';
import { ClientController } from './client.controller';
import { ClientService as ClientServiceV1 } from './client.service';

@Module({
  imports: [forwardRef(() => BaseModule)],
  controllers: [ClientController],
  providers: [ClientServiceV1],
})
export class ClientModule {}
