import { forwardRef, Module } from '@nestjs/common';
import { ClientModule as ClientModuleV1 } from './v1/client.module';
import { ClientModule as ClientModuleV2 } from './v2/client.module';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';

@Module({
  imports: [forwardRef(() => ClientModuleV1), forwardRef(() => ClientModuleV2)],
  providers: [ClientRepository, ClientService],
  exports: [ClientRepository, ClientService],
})
export class ClientModule {}
