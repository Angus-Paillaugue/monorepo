import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UsernameTakenException } from '../user/exceptions/usernameTaken.exception';
import { UserNotFoundException } from '../user/exceptions/userNotFound.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async logIn(
    username: UserEntity['username'],
    password: string
  ): Promise<{ token: string }> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UserNotFoundException(username);
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UsernameTakenException();
    }
    const payload = { id: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(
    username: UserEntity['username'],
    password: string
  ): Promise<UserDTO> {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await this.userService.create(username, hash);
    return plainToInstance(UserDTO, newUser);
  }
}
