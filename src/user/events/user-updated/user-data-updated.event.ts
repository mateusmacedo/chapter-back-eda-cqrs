import { ModifyUserDto } from 'src/user/dto/modify.dto'

export class UserUpdatedEvent {
  constructor(public readonly identifier: string, public readonly data: ModifyUserDto) {}
}
