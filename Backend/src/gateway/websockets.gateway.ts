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
  private globalUserSignInCount = 0;
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway initialized');

    // Fetch initial global sign-in count from the database
    this.userService
      .findGlobalSignInCount()
      .then((count) => {
        this.globalUserSignInCount = count;
        this.logger.log(
          `Initial global sign-in count: ${this.globalUserSignInCount}`,
        );

        // Emit initial global sign-in count to all clients
        this.server.emit('globalUserSignInCount', this.globalUserSignInCount);
      })
      .catch((error) => {
        this.logger.error('Error fetching initial global sign-in count', error);
      });
  }

  async handleConnection(client: Socket) {
    try {
      const userId = this.getUserIdFromToken(client);
      if (!userId) {
        throw new UnauthorizedException('Invalid user ID in token');
      }

      const personalUserSignInCount =
        await this.userService.findPersonalSignInCount(userId);
      this.globalUserSignInCount =
        await this.userService.findGlobalSignInCount();

      client.emit('roomId', userId);
      client.on('joinRoom', (roomId: string) => {
        client.join(roomId);
        this.logger.log(`Client joined room: ${roomId}`);

        this.server
          .to(roomId)
          .emit('personalSignInCount', personalUserSignInCount);

        this.server.emit('globalUserSignInCount', this.globalUserSignInCount);
      });

      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error('Error during connection', error.stack);
      this.handleDisconnect(client);
    }
  }

  @SubscribeMessage('loginEvent')
  async handleLoginEvent(client: Socket, data: any) {
    try {
      if (this.globalUserSignInCount % 5 === 0) {
        this.server.emit('fifthLoginNotification');
      }
    } catch (error) {
      this.logger.error('Error fetching global sign-in count', error);
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
