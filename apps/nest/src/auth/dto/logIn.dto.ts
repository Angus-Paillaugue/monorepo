import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../../user/user.entity';

export class LogInDTO {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim())
  readonly username: UserEntity['username'];

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
