import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedDomainEvent } from 'src/modules/user/domain/events/user-created.event';

@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedDomainEvent>
{
  async handle(event: UserCreatedDomainEvent): Promise<void> {
    console.log("-------------SURVEY MODULE: Event Captured from Event bus-------------")
    console.log(`Handling UserCreatedDomainEvent: ${event.userId.toString()}`);
    console.log(`Welcome email sent to: ${event.email.toString()}`);
  }
}
