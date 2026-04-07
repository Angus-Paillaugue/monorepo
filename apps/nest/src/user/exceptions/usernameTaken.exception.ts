import { HttpStatus } from '@nestjs/common';
import { NestException } from '../../exception/nest-exception';

export class UsernameTakenException extends NestException {
  constructor() {
    super('Username taken', HttpStatus.BAD_REQUEST);
  }
}
