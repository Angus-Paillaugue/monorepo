import { HttpStatus } from '@nestjs/common';
import { NestException } from '../../exception/nest-exception';

export class MissingCredentialsException extends NestException {
  constructor() {
    super('Missing credentials', HttpStatus.NOT_FOUND);
  }
}
