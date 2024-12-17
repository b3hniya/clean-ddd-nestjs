import { UserRepositoryInterface } from './user.repository.interface';
import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInMemoryRepository implements UserRepositoryInterface {
  private readonly users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.getId().toString(), user);
    console.log(`User saved: ${user.getId().toString()}`);
  }
}
