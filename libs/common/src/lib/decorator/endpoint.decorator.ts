import {
  applyDecorators,
  Get as RouteGet,
  Post as RoutePost,
  Put as RoutePut,
  Patch as RoutePatch,
  Delete as RouteDelete,
  Options as RouteOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  ClassConstructor,
  IEndpointOptions,
  IDocumentationOptions,
} from '../interface';
import { SerializeInterceptor } from '../interceptor';
import {
  ErrorMessage,
  SuccessMessage,
  TMessageOptions,
} from './message.decorator';

/**
 * A decorator function that applies success and error message decorators to a method.
 *
 * @param {TMessageOptions} options - The options for the success and error messages.
 * @param {Object} options.success - The success message options.
 * @param {number} options.success.httpStatus - The HTTP status code for the success message.
 * @param {string} options.success.message - The success message text.
 * @param {Object} options.failed - The error message options.
 * @param {string} options.failed.message - The error message text.
 *
 * @returns {MethodDecorator} - The combined method decorator.
 */
export function Message({ success, failed }: TMessageOptions): MethodDecorator {
  const decorators = [];
  if (success)
    decorators.push(
      SuccessMessage({
        httpStatus: success.httpStatus,
        message: success.message,
      }),
    );

  if (failed) decorators.push(ErrorMessage(failed.message));

  return applyDecorators(...decorators);
}

/**
 * A decorator function that applies the `SerializeInterceptor` to a method.
 * This interceptor will transform the response data into an instance of the specified DTO class.
 *
 * @param dto - The class constructor of the DTO to which the response data should be transformed.
 * @returns A method decorator that uses the `SerializeInterceptor`.
 *
 * @example
 * ```ts
 * @Serialize(UserDto)
 * public async findAll(): Promise<User[]> {
 *  return this.userService.findAll();
 * }
 */
export function Serialize(dto: ClassConstructor): MethodDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * A decorator function that applies the `ApiOperation` and `ApiResponse` decorators
 * to a method based on the provided options.
 *
 * @param {IDocumentationOptions} options - The options for the documentation decorators.
 * @param {number} options.status - The HTTP status code for the response.
 * @param {string} options.description - The description of the endpoint.
 * @param {string} options.summary - The summary of the endpoint.
 * @param {Type<unknown>} options.type - The type of the response data.
 * @param {boolean} options.useAuth - A flag indicating if the endpoint requires authentication.
 *
 * @returns {MethodDecorator} - The combined method decorator.
 */
export function Documentation({
  status,
  description,
  summary,
  type,
  useAuth,
}: IDocumentationOptions): MethodDecorator {
  const decorators = [
    ApiOperation({ summary, description }),
    ApiResponse({ status, type, example: type }),
  ];

  if (useAuth) decorators.push(ApiBearerAuth());

  return applyDecorators(...decorators);
}

/**
 * A decorator function that applies multiple decorators to a method.
 *
 * @param options - An object containing options for the endpoint.
 * @returns A method decorator that applies the specified decorators.
 */
export function Endpoint(options?: IEndpointOptions): MethodDecorator {
  const decorators = [];
  if (options?.documentation)
    decorators.push(Documentation(options.documentation));

  if (options?.message) decorators.push(Message(options.message));

  if (options?.serialize) decorators.push(Serialize(options.serialize));

  return applyDecorators(...decorators);
}

/**
 * Decorator that combines the functionality of a GET route and an endpoint configuration.
 * This is used to define a GET endpoint with specific options.
 *
 * @param options - Configuration options for the endpoint.
 * @param options.url - The URL for the GET route.
 * @returns A method decorator that applies the GET route and endpoint configuration.
 */
export function Get(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RouteGet(options.url), Endpoint(options));
}

/**
 * A decorator function that combines the functionality of `RoutePost` and `Endpoint` decorators.
 * This is used to define a POST endpoint with specific options.
 *
 * @param options - The configuration options for the endpoint.
 * @param options.url - The URL for the POST route.
 * @returns A method decorator that applies the `RoutePost` and `Endpoint` decorators.
 */
export function Post(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RoutePost(options.url), Endpoint(options));
}

/**
 * A decorator function that combines the `RoutePut` and `Endpoint` decorators.
 * This function is used to define a PUT endpoint with the specified options.
 *
 * @param options - The options to configure the endpoint.
 * @param options.url - The URL for the PUT route.
 * @returns A method decorator that applies the `RoutePut` and `Endpoint` decorators.
 */
export function Put(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RoutePut(options.url), Endpoint(options));
}

/**
 * A decorator function that combines the `RoutePatch` and `Endpoint` decorators.
 * It is used to define a PATCH endpoint with the specified options.
 *
 * @param options - The options to configure the endpoint.
 * @param options.url - The URL for the PATCH route.
 * @returns A method decorator that applies the `RoutePatch` and `Endpoint` decorators.
 */
export function Patch(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RoutePatch(options.url), Endpoint(options));
}

/**
 * A decorator function that combines the `RouteDelete` and `Endpoint` decorators.
 * This is used to mark a method as a DELETE endpoint with additional options.
 *
 * @param options - The options to configure the endpoint.
 * @param options.url - The URL for the DELETE route.
 * @returns A method decorator that applies the DELETE route and endpoint options.
 */
export function Delete(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RouteDelete(options.url), Endpoint(options));
}

/**
 * A decorator function that applies route options and endpoint options to a method.
 *
 * @param options - The endpoint options to be applied.
 * @param options.url - The URL for the route.
 * @returns A method decorator that applies the specified options.
 */
export function Options(
  options: IEndpointOptions & { url?: string },
): MethodDecorator {
  return applyDecorators(RouteOptions(options.url), Endpoint(options));
}
