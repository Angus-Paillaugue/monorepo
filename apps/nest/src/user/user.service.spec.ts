import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

describe('UserService', () => {
  let service: UserService;
  // let repository: Repository<UserEntity>;

  // Mock data for tests
  const mockUser: UserEntity = {
    id: 1,
    username: 'Angus',
    passwordHash: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Define a mock repository with the methods used in UserService
  const mockUserRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // repository = module.get<Repository<UserEntity>>(
    //   getRepositoryToken(UserEntity)
    // );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no user is found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('findByUsername', () => {
    it('should return a user by username', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.findByUsername('Angus');

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({
        username: 'Angus',
      });
    });
  });

  describe('remove', () => {
    it('should call the repository delete method', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should save and return a new user', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);
      const userData = { username: 'NewUser', passwordHash: 'hash' };
      const savedUser = {
        id: 2,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.save.mockResolvedValue(savedUser);

      const result = await service.create(
        userData.username,
        userData.passwordHash
      );

      expect(result).toEqual(savedUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(userData);
    });
  });
});
