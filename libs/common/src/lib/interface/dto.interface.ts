import { ApiPropertyOptions } from '@nestjs/swagger';
import { ExposeOptions } from 'class-transformer';

export interface IDtoOptions {
  expose: ExposeOptions;
  documentation?: ApiPropertyOptions;
  validation?: PropertyDecorator[];
}
