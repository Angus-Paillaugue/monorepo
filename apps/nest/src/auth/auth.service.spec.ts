import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/user.entity';
import { UserNotFoundException } from '../user/exceptions/userNotFound.exception';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const mockUserService = {
      findByUsername: jest.fn(),
      create: jest.fn(),
    };
    const mockJwtService = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logIn', () => {
    it('should throw UserNotFoundException if user not found', async () => {
      userService.findByUsername.mockResolvedValue(null);
      await expect(service.logIn('test', 'pass')).rejects.toThrow(
        UserNotFoundException
      );
    });

    it('should return token on success', async () => {
      const mockUser: UserEntity = {
        id: 1,
        username: 'Angus',
        passwordHash: 'hashed',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userService.findByUsername.mockResolvedValue(mockUser);

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('fake_token');

      const result = await service.logIn('Angus', 'correct_password');
      expect(result).toEqual({ token: 'fake_token' });
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        id: 1,
        username: 'Angus',
      });
    });
  });
});
