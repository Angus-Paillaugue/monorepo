import { Expose } from 'class-transformer';
import { UserEntity } from '../user.entity';

export class UserDTO {
  @Expose()
  readonly id: UserEntity['id'];

  @Expose()
  readonly username: UserEntity['username'];
}
