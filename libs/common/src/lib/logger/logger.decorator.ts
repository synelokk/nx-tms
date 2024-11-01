import { applyDecorators, Logger } from '@nestjs/common';
import {
  EventPattern as Event,
  MessagePattern as Message,
} from '@nestjs/microservices';

/**
 * A decorator that logs a warning message whenever the decorated method is called.
 * The log message includes the name of the class and the method being called.
 *
 * @returns A method decorator function.
 */
export const Log = () => {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): any => {
    const targetFunc = descriptor.value;
    descriptor.value = function (...args: any[]): any {
      Logger.warn(`Calling ${target.constructor.name}.${propertyKey}`);
      return targetFunc.apply(this, args);
    };
    return descriptor;
  };
};

/**
 * A decorator that combines logging and event pattern functionality.
 *
 * This decorator applies both the `Log` and `Event` decorators to the target.
 *
 * @param cmd - The command string that specifies the event pattern.
 * @returns A decorator function that applies logging and event pattern functionality.
 */
export const EventPattern = (cmd: string): any => {
  return applyDecorators(Log() as MethodDecorator, Event(cmd));
};

/**
 * A decorator that combines logging and message pattern functionality.
 *
 * This decorator applies both the `Log` and `Message` decorators to a method.
 *
 * @param cmd - The command string that identifies the message pattern.
 * @returns A decorator function that applies logging and message pattern functionality.
 */
export const MessagePattern = (cmd: string): any => {
  return applyDecorators(Log() as MethodDecorator, Message(cmd));
};
