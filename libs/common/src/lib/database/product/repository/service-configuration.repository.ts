import { Injectable } from '@nestjs/common';
import { ServiceConfigurationEntity } from '../..';
import { Repository } from '../../../repository';

@Injectable()
export class ServiceConfigurationRepository extends Repository<ServiceConfigurationEntity> {
  constructor() {
    super(ServiceConfigurationEntity);
  }
}
