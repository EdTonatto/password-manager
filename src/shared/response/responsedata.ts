import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class ResponseData<T> {
  @ApiProperty()
  public sucess: boolean;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: T;

  constructor(sucess: boolean, message: string, data: T) {
    this.sucess = sucess;
    this.message = message;
    this.data = data;
  }

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
