// src/modules/user/application/commands/create-user.handler.ts

import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepositoryInterface } from '../../infrastructure/persistance/repositories/user.repository.interface';
import { UserId } from '../../domain/value-objects/user-id.vo';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';
import { UserCreatedDomainEvent } from '../../domain/events/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    // Step 1: Validate and create domain objects
    const userId = new UserId();
    const email = new Email(command.email);

    // Step 2: Create User entity
    const user = User.create(userId, email, command.name);

    // Step 3: Persist User entity
    await this.userRepository.save(user);

    // Step 4: Publish domain event
    const event = new UserCreatedDomainEvent(userId, email, command.name);
    this.eventBus.publish(event);

    console.log(`User created: ${userId.toString()} - ${email.toString()}`);
  }
}
