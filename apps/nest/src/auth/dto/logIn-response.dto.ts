import { Expose } from 'class-transformer';

export class LoginResponseDTO {
  @Expose()
  readonly token: string;
}
