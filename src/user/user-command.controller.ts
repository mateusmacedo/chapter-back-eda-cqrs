import { Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger'
import { v4 as uuidv4 } from 'uuid'

import { CreateUserCommand } from './commands/create-user/create-user.command'
import { RemoveUserCommand } from './commands/remove-user/remove-user.command'
import { UpdateUserCommand } from './commands/update-user/update-user.command'
import { ModifyUserDto } from './dto/modify.dto'
import { AccessUser } from './guards/access.guard'
import { IRequestUser } from './interfaces/request.interface'

@ApiTags('Users')
@UseGuards(AccessUser)
@Controller('users')
export class UserCommandController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiBody({ type: ModifyUserDto })
  public CreateUser(@Body() data: ModifyUserDto) {
    data.id = uuidv4()
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ type: ModifyUserDto })
  public UpdateUser(@Req() req: IRequestUser, @Body() data: ModifyUserDto) {
    return this.commandBus.execute(new UpdateUserCommand(req.user, data));
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  public RemoveUser(@Req() req: IRequestUser) {
    return this.commandBus.execute(new RemoveUserCommand(req.user));
  }
}
