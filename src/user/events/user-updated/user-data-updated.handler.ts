import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { UserRepo } from 'src/user/repository/user.repository'

import { UserUpdatedEvent } from './user-data-updated.event'

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  public constructor(private readonly userRepository: UserRepo) {}

  public async handle(event: UserUpdatedEvent) {
    await this.userRepository.updateUser(event.identifier, event.data);
  }
}
