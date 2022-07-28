import { Injectable } from '@nestjs/common'
import { EventBus, IEvent } from '@nestjs/cqrs'
import { InjectModel } from '@nestjs/sequelize'
import { User } from 'src/user/entities/user.entity'

import { GetEventDto } from './dto/get.dto'
import { Event } from './repository/event.entity'

@Injectable()
export class EventStoreService {
  private readonly eventsToIgnoreOnReplay: string[] = [];
  public constructor(
    private readonly eventBus: EventBus,
    @InjectModel(Event) private readonly events: typeof Event,
    @InjectModel(User) private readonly userEntity: typeof User
  ) {
  }

  public Get(event: Event): GetEventDto {
    return { id: event.id, name: event.name, json: event.json, createdAt: event.createdAt };
  }

  public async List() {
    const events = await this.events.findAll({ attributes: ['id', 'name', 'json', 'createdAt'] });
    return events.map(this.Get);
  }

  public async RegisterEvent(event: IEvent) {
    await this.events.create({ name: event.constructor.name, json: event });
  }
}
