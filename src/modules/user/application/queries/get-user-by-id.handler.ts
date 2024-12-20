import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../infrastructure/persistance/repositories/user.repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<User | null> {
    const { userId } = query;

    // Retrieve user by ID
    const user = await this.userRepository.findById(userId);

    return user ? user : null;
  }
}
