import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { User } from '../../domain/entities/user.entity';
import { GetUserByIdQuery } from '../../application/queries/get-user-by-id.query';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  async getUsers() {
    return 'This is a test';
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<User | { message: string }> {
    const user = await this.queryBus.execute(new GetUserByIdQuery(id));
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const { email, name } = createUserDto;

    // Send the command to the CommandBus
    await this.commandBus.execute(new CreateUserCommand(email, name));

    return `User with email '${email}' created successfully.`;
  }
}
