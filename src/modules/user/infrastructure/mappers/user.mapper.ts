import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.create(
      new UserId(prismaUser.id),
      new Email(prismaUser.email),
      prismaUser.name,
    );
  }

  static toPrisma(domainUser: User): PrismaUser {
    return {
      id: domainUser.getId().toString(),
      email: domainUser.getEmail().toString(),
      name: domainUser.getName(),
      createdAt: new Date(), // Mock; replace with actual timestamps
      updatedAt: new Date(),
    };
  }
}
