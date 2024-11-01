import { IDocumentationOptions } from './documentation.interface';
import {
  IErrorMessageOptions,
  ISuccessMessageOptions,
} from './message.interface';

export * from '../repository/repository.interface';
export * from '../service/service.interface';

export * from './documentation.interface';
export * from './message.interface';

export * from '../authorization/authorization.config';

/**
 * Interface representing a class constructor.
 *
 * This interface defines a type for constructors that can be used to create instances of a class.
 * It accepts any number of arguments of any type and returns an object.
 *
 * @interface ClassConstructor
 * @template T - The type of the object that the constructor creates.
 */
export interface ClassConstructor {
  new (...args: any[]): object;
}

export interface IEndpointOptions {
  documentation?: IDocumentationOptions;
  message?: {
    success?: ISuccessMessageOptions;
    failed?: IErrorMessageOptions;
  };
  serialize?: ClassConstructor;
}
