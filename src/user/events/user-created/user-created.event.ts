import { ModifyUserDto } from 'src/user/dto/modify.dto'

export class UserCreatedEvent {
  constructor(public readonly data: ModifyUserDto) {}
}
