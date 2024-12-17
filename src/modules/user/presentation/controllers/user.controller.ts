// src/modules/user/presentation/controllers/user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getUsers() {
    return 'This is a test';
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    const { email, name } = createUserDto;

    // Send the command to the CommandBus
    await this.commandBus.execute(new CreateUserCommand(email, name));

    return `User with email '${email}' created successfully.`;
  }
}
