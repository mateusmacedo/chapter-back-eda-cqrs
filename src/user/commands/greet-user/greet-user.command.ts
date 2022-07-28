import { ICommand } from '@nestjs/cqrs'

export class GreetUserCommand implements ICommand {
  public constructor(public readonly id: string) {}
}
