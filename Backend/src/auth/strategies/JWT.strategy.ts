import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { jwtConstants } from '../auth.constants';
import { JwtUserPayload } from '../auth.types';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.accessTokenSecret,
    });
  }

  async validate(payload: JwtUserPayload) {
    const { id, username } = payload;

    if (!id || !username) {
      throw new UnauthorizedException();
    }

    const user: User = await this.userService.findOne({ id, username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
