import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { WebsocketsGateway } from 'src/gateway/websockets.gateway';
import { EmojiLogger } from 'src/Shared/EmojiLogger';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger: EmojiLogger = new EmojiLogger();
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private websocketGateway: WebsocketsGateway,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      this.logger.log('Invalid user');
      throw new UnauthorizedException();
    }

    user.signInCount += 1;
    await this.userService.update(user.id, { signInCount: user.signInCount });

    try {
      const globalSignInCount = await this.userService.findGlobalSignInCount();
      if (globalSignInCount % 5 === 0) {
        this.websocketGateway.emitEvent('fifthLoginNotification');
      }
    } catch (error) {
      this.logger.error(error, 'Error in LocalStrategy');
    }

    return user;
  }
}
