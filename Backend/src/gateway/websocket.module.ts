import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.accessTokenSecret,
      signOptions: { expiresIn: '15min' },
    }),
  ],
  providers: [WebsocketsGateway],
})
export class WebsocketsGatewayModule {}
