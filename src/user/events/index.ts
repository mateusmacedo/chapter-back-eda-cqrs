import { UserCreatedEvent } from './user-created/user-created.event'
import { UserCreatedHandler } from './user-created/user-created.handler'
import { UserGreetedHandler } from './user-greeted/user-greeted.handler'
import { UserLoggedInEvent } from './user-logged-in/user-logged-in.event'
import { UserLoggedInHandler } from './user-logged-in/user-logged-in.handler'
import { UserRemovedEvent } from './user-removed/user-removed.event'
import { UserRemovedHandler } from './user-removed/user-removed.handler'
import { UserUpdatedEvent } from './user-updated/user-data-updated.event'
import { UserUpdatedHandler } from './user-updated/user-data-updated.handler'

export const UserEventHandlers = [
  UserCreatedHandler,
  UserGreetedHandler,
  UserUpdatedHandler,
  UserLoggedInHandler,
  UserRemovedHandler
];
export const UserEvents = [UserCreatedEvent, UserUpdatedEvent, UserLoggedInEvent, UserRemovedEvent];
