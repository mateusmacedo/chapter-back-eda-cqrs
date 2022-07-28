import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SequelizeModule } from '@nestjs/sequelize'
import { DatabaseModule } from 'src/database/database.module'

import { UserCommandHandlers } from './commands'
import { UserEntities } from './entities'
import { UserEventHandlers } from './events'
import { UserQueryHandlers } from './queries'
import { UserRepo } from './repository/user.repository'
import { UserSagas } from './sagas/user.sagas'
import { UserCommandController } from './user-command.controller'
import { UserQueryController } from './user-query.controller'

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature(UserEntities), DatabaseModule],
  controllers: [UserQueryController, UserCommandController],
  providers: [UserRepo, ...UserCommandHandlers, ...UserQueryHandlers, ...UserEventHandlers, UserSagas]
})
export class UserModule {}
