import { Expose } from 'class-transformer';
import {
  TErrorResponse,
  TResponse,
  TSuccesResponse,
} from '../message.interface';

export class ResponseDTO {
  @Expose({
    name: 'status_code',
  })
  public statusCode: string;

  @Expose({
    name: 'message',
  })
  public message: string;

  @Expose({
    name: 'datetime',
  })
  public datetime?: string;

  @Expose({
    name: 'request_id',
  })
  public requestId: string;

  constructor({ requestId, statusCode, message, datetime }: TResponse) {
    this.requestId = requestId;
    this.statusCode = statusCode;
    this.message = message;
    this.datetime = datetime;
  }
}

export class SuccessResponseDTO<T> extends ResponseDTO {
  @Expose({
    name: 'data',
  })
  public data?: T;

  constructor({
    requestId,
    statusCode,
    message,
    datetime,
    data,
  }: TSuccesResponse<T>) {
    super({
      requestId,
      statusCode,
      message,
      datetime,
    });
    this.data = data;
  }
}

export class ErrorResponseDTO<T> extends ResponseDTO {
  @Expose({
    name: 'error_message',
  })
  public errorMessage?: string;

  @Expose({
    name: 'error_detail',
  })
  public errorDetail?: T;

  @Expose({
    name: 'error_code',
  })
  public errorCode?: string;

  constructor({
    requestId,
    statusCode,
    message,
    datetime,
    errorMessage,
    errorDetail,
    errorCode,
  }: TErrorResponse<T>) {
    super({ requestId, statusCode, message, datetime });
    this.errorMessage = errorMessage;
    this.errorDetail = errorDetail;
    this.errorCode = errorCode;
  }
}
