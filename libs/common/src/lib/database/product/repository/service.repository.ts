import { Injectable } from '@nestjs/common';
import { ServiceEntity } from '../entity';
import { Repository } from '../../../repository';

@Injectable()
export class ServiceRepository extends Repository<ServiceEntity> {
  constructor() {
    super(ServiceEntity);
  }
}
