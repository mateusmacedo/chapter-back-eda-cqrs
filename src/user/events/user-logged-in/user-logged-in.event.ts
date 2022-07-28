export class UserLoggedInEvent {
  constructor(public readonly userId: string, public readonly address: string, public readonly browser: string) {}
}
