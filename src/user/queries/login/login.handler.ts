import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { sign } from 'jsonwebtoken'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { LoginDto } from 'src/user/dto/login.dto'
import { UserRepo } from 'src/user/repository/user.repository'

import { LoginQuery } from './login.query'

@QueryHandler(LoginQuery)
export class LoginHandler implements IQueryHandler<LoginQuery> {
  public constructor(private config: ConfigService, private readonly userRepository: UserRepo) {}

  public async execute(query: LoginQuery): Promise<LoginDto> {
    const user = await this.userRepository.findByLogin(query.data.nameOrEmail);
    if (!user || !user.comparePassword(query.data.password)) {
      throw new UnauthorizedException();
    }

    const userData: LoginUserDto = {
      name: user.data.name,
      fullName: user.data.fullName,
      email: user.data.email,
      lang: user.data.lang
    };
    const jwt = this.CreateJwt(userData);

    user.addLoginHistory(
      <string>query.req.headers['x-forwarded-for'] || query.req.socket.remoteAddress,
      query.req.headers['user-agent']
    );
    user.commit();

    return { ...userData, jwt };
  }

  private CreateJwt(data: LoginUserDto): string {
    return sign(data, this.config.get<string>('authentication.jwtSecret'), {
      expiresIn: this.config.get<number>('authentication.expiresIn')
    });
  }
}
