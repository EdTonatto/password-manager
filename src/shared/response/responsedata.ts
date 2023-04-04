import { HttpException, HttpStatus } from '@nestjs/common';

class ResponseData<T> {
  constructor(public sucess: boolean, public message: string, public data: T) {}

  static success<T>(data: T): ResponseData<T> {
    return new ResponseData(true, '', data);
  }

  static failure<T>(message: string): ResponseData<T> {
    return new ResponseData(false, message, null);
  }

  static exception<T>(
    message: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    throw new HttpException(this.failure(message), httpStatus);
  }
}

export { ResponseData };
