import { forwardRef, Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientRepository } from './client.repository';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [ClientRepository, ClientService],
  exports: [ClientRepository, ClientService],
})
export class ClientModule {}
