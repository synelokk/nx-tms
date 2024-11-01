import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

/**
 * Custom decorator to extract and validate headers from the request.
 *
 * This decorator uses `createParamDecorator` to create a custom parameter decorator
 * that extracts headers from the incoming HTTP request, converts them to a DTO object,
 * and validates the DTO object.
 *
 * @param value - The DTO class to which the headers should be converted.
 * @param ctx - The execution context which provides access to the request object.
 * @returns The validated DTO object containing the headers.
 *
 * @throws {ValidationError[]} If the validation of the DTO object fails.
 */
export const Header = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;

    // Convert headers to DTO object
    const dto = plainToInstance(value, headers, {
      excludeExtraneousValues: true,
    });

    // Validate
    await validateOrReject(dto);

    // return header dto object
    return dto;
  },
);
