import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';

import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';
import { UserCreatedDomainEvent } from '../../domain/events/user-created.event';
import { UserRepository } from "../../infrastructure/persistance/repositories/user.repository";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const userId = new UserId();
    const email = new Email(command.email);

    const user = User.create(userId, email, command.name);
    await this.userRepository.save(user);

    const event = new UserCreatedDomainEvent(userId, email, command.name);
    this.eventBus.publish(event);

    console.log(`User created: ${userId.toString()} - ${email.toString()}`);
  }
}
