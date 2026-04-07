import { HttpException, HttpStatus } from '@nestjs/common';
import { Expose } from 'class-transformer';

export class NestException extends HttpException {
  @Expose()
  statusCode: HttpStatus;

  @Expose()
  message: string;
}
