import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { Inject } from '@nestjs/common';
import {
  UserRepositoryInterface,
  USER_REPOSITORY,
} from '../../infrastructure/persistance/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    const { userId } = query;

    // Retrieve user by ID
    const user = await this.userRepository.findById(userId);

    return user ? user : null;
  }
}
