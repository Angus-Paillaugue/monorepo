import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';
import { LogInDTO } from './dto/logIn.dto';
import { UserDTO } from '../user/dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { SignUpDTO } from './dto/signUp.dto';
import { LoginResponseDTO } from './dto/logIn-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('log-in')
  async logIn(@Body() logInDTO: LogInDTO) {
    const result = await this.authService.logIn(
      logInDTO.username,
      logInDTO.password
    );
    return plainToInstance(LoginResponseDTO, result);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDTO) {
    return await this.authService.signUp(signUp.username, signUp.password);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  getProfile(@User() user: UserEntity) {
    return plainToInstance(UserDTO, user);
  }
}
