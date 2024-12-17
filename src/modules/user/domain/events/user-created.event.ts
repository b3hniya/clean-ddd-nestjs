import { UserId } from '../value-objects/user-id.vo';
import { Email } from '../value-objects/email.vo';

export class UserCreatedDomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: Email,
    public readonly name: string,
  ) {}
}
