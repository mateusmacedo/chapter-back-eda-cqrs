import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'

import { GreetUserCommand } from '../commands/greet-user/greet-user.command'
import { UserCreatedEvent } from '../events/user-created/user-created.event'

@Injectable()
export class UserSagas {
  @Saga()
  userCreated = (events$: Observable<any>) : Observable<ICommand> =>{
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(2000),
      map(event => new GreetUserCommand(event.data.id))
    )
  }
}
