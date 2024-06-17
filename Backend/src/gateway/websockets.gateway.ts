import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
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

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  emitEvent(event: string) {
    this.server.emit(event);
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
      const roomId = `${userId}`;

      client.join(roomId);
      this.logger.log(`Client joined room: ${roomId}`);

      this.server
        .to(roomId)
        .emit('personalSignInCount', personalUserSignInCount);

      this.server.emit('globalUserSignInCount', globalUserSignInCount);

      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error('Error during connection', error.stack);
      this.handleDisconnect(client);
    }
  }

  getUserIdFromToken(client: Socket): number {
    const token = client.handshake.auth.token;

    if (!token) {
      this.handleDisconnect(client);
      throw new UnauthorizedException('No authorization token provided');
    }

    let decoded: JwtUserPayload;
    try {
      decoded = this.jwtService.verify(token);
    } catch (error) {
      this.handleDisconnect(client);
      throw new UnauthorizedException('Invalid token');
    }

    if (!decoded.id) {
      this.handleDisconnect(client);
      throw new UnauthorizedException('Invalid user ID in token');
    }
    return decoded.id;
  }

  handleDisconnect(client: any) {
    client.disconnect();
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
