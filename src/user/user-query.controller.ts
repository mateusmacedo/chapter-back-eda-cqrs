import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { GetUserDto } from './dto/get.dto'
import { UserLoginHistoryDto } from './dto/login-history.dto'
import { LoginInputDto } from './dto/login-input.dto'
import { LoginDto } from './dto/login.dto'
import { AccessUser } from './guards/access.guard'
import { IRequestUser } from './interfaces/request.interface'
import { GetUserQuery } from './queries/get-user/get-user.query'
import { ListUsersQuery } from './queries/list-users/list-users.query'
import { GetLoginHistoryQuery } from './queries/login-history/login-history.query'
import { LoginQuery } from './queries/login/login.query'

@ApiTags('Users')
@UseGuards(AccessUser)
@Controller('users')
export class UserQueryController {
  public constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOkResponse({ type: [GetUserDto] })
  public List() {
    return this.queryBus.execute<ListUsersQuery, GetUserDto[]>(new ListUsersQuery());
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: GetUserDto })
  public GetUser(@Req() req: IRequestUser) {
    return this.queryBus.execute<GetUserQuery, GetUserDto>(new GetUserQuery(req.user));
  }

  @Get(':id/login-history')
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: [UserLoginHistoryDto] })
  public GetLoginHistory(@Req() req: IRequestUser) {
    return this.queryBus.execute<GetLoginHistoryQuery, UserLoginHistoryDto[]>(
      new GetLoginHistoryQuery(req.user.data.id)
    );
  }

  @Post('login')
  @ApiBody({ type: LoginInputDto })
  @ApiCreatedResponse({ type: GetUserDto })
  public Login(@Req() req: Request, @Body() data: LoginInputDto) {
    return this.queryBus.execute<LoginQuery, LoginDto>(new LoginQuery(req, data));
  }
}
