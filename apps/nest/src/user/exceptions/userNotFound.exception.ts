import { HttpStatus } from '@nestjs/common';
import { NestException } from '../../exception/nest-exception';

export class UserNotFoundException extends NestException {
  constructor(username?: string) {
    super(
      `User${username ? ' ' + username : ''} not found`,
      HttpStatus.NOT_FOUND
    );
  }
}
