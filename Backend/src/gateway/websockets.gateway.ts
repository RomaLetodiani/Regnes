import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { EmojiLogger } from 'src/Shared/EmojiLogger';
import { JwtUserPayload } from 'src/auth/auth.types';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class WebsocketsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: EmojiLogger = new EmojiLogger();

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      const userId = this.getUserIdFromToken(client);
      if (!userId) {
        throw new UnauthorizedException('Invalid user ID in token');
      }

      const personalUserSignInCount =
        await this.userService.findPersonalSignInCount(userId);

      const globalUserSignInCount =
        await this.userService.findGlobalSignInCount();

      client.emit('roomId', userId);
      client.on('joinRoom', (roomId: string) => {
        client.join(roomId);
        this.logger.log(`Client joined room: ${roomId}`);

        this.server
          .to(roomId)
          .emit('personalSignInCount', personalUserSignInCount);

        this.server.emit('globalUserSignInCount', globalUserSignInCount);
      });

      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.handleDisconnect(client);
    }
  }

  getUserIdFromToken(client: Socket): number {
    const token = client.handshake.auth.token;

    if (!token) {
      throw new UnauthorizedException('No authorization token provided');
    }

    let decoded: JwtUserPayload;
    try {
      decoded = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!decoded.id) {
      throw new UnauthorizedException('Invalid user ID in token');
    }
    return decoded.id;
  }

  handleDisconnect(client: any) {
    client.disconnect();
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
