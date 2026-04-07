import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsernameTakenException } from './exceptions/usernameTaken.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: UserEntity['id']): Promise<UserEntity | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByUsername(username: UserEntity['username']) {
    return await this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(
    username: UserEntity['username'],
    passwordHash: UserEntity['passwordHash']
  ) {
    const usernameTaken = await this.findByUsername(username);
    if (usernameTaken) {
      throw new UsernameTakenException();
    }
    return this.usersRepository.save({ username, passwordHash });
  }
}
