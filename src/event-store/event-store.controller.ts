import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'

import { GetEventDto } from './dto/get.dto'
import { EventStoreService } from './event-store.service'
import { AccessEvent } from './guards/access.guard'
import { IRequestEvent } from './interfaces/request.interface'

@ApiTags('Events')
@UseGuards(AccessEvent)
@Controller('events')
export class EventStoreController {
  public constructor(private readonly eventStoreService: EventStoreService) {}

  @Get()
  @ApiOkResponse({ type: [GetEventDto] })
  public List() {
    return this.eventStoreService.List();
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GetEventDto })
  public GetUser(@Req() req: IRequestEvent) {
    return this.eventStoreService.Get(req.event);
  }
}
