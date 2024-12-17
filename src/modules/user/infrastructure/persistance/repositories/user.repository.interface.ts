import { User } from '../../../domain/entities/user.entity';

export const USER_REPOSITORY = Symbol('UserRepositoryInterface');
export interface UserRepositoryInterface {
  save(user: User): Promise<void>;
}
