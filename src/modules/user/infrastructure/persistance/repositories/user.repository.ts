import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../shared/config/app-module-config/prisma/prisma.service';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(email: string, name: string): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: { email, name },
    });

    return UserMapper.toDomain(prismaUser);
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { id } });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();
    return prismaUsers.map(UserMapper.toDomain);
  }

  async save(user: User): Promise<User> {
    return user;
  }
}
