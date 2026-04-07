import { Expose } from 'class-transformer';

export class ExceptionDTO {
  @Expose()
  statusCode: number;

  @Expose()
  timestamp: string;

  @Expose()
  path: string;

  @Expose()
  message: string;
}
