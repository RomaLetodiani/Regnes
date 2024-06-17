import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { LocalStrategy } from './strategies/Local.strategy';
import { JwtStrategy } from './strategies/JWT.strategy';
import { WebsocketsGateway } from 'src/gateway/websockets.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.accessTokenSecret,
      signOptions: { expiresIn: '15min' },
    }),
  ],
  providers: [
    AuthService,
    WebsocketsGateway,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
  ],
})
export class AuthModule {}
