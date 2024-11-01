/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '../exception/base.exception';

/**
 * A pipe that handles transformation and validation of incoming values.
 *
 * @remarks
 * This pipe uses class-transformer and class-validator to transform and validate
 * incoming data based on the provided metadata. If the validation fails, it throws
 * a BadRequestException.
 *
 * @example
 * Use this pipe in a controller to automatically validate incoming requests:
 *
 * ```typescript
 * @Post()
 * async create(@Body(new ValidationPipe()) createDto: CreateDto) {
 *   // handle the request
 * }
 * ```
 *
 * @public
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  /**
   * Transforms and validates the incoming value based on the provided metadata.
   *
   * @param value - The value to be transformed and validated.
   * @param metatype - The metadata containing the type information.
   * @returns The original value if validation passes.
   * @throws {BadRequestException} If validation fails.
   */
  public async transform(
    value: any,
    { metatype }: ArgumentMetadata
  ): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value, {
      exposeUnsetFields: false,
    });
    const errors = await validate(object);
    const listError: BadRequestException[] = [];
    if (errors.length > 0) {
      for (const error of errors) {
        for (const key in error.constraints) {
          listError.push(
            new BadRequestException({
              requestId: "",
              message: error.constraints[key],
              key: error.property,
              error: error.value,
              language: 'EN',
            })
          );
        }
      }
      console.log(listError);
      throw listError[0];
    }
    return object;
  }

  /**
   * Determines if the given metatype requires validation.
   *
   * @param metatype - The metatype to check.
   * @returns `true` if the metatype requires validation, `false` otherwise.
   */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
