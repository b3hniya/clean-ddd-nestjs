import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedDomainEvent } from '../../domain/events/user-created.event';

@EventsHandler(UserCreatedDomainEvent)
export class UserCreatedEventHandler
  implements IEventHandler<UserCreatedDomainEvent>
{
  async handle(event: UserCreatedDomainEvent): Promise<void> {
    console.log(
      '-------------USER MODULE: Event Captured from Event bus-------------',
    );
    console.log(`Handling UserCreatedDomainEvent: ${event.userId.toString()}`);
    console.log(`Survey email sent to: ${event.email.toString()}`);
  }
}
