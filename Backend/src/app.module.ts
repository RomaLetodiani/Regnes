import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GraphQLError } from 'graphql';
import { EmojiLogger } from './Shared/EmojiLogger';
import { WebsocketsGatewayModule } from './gateway/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sqlite.db',
      synchronize: true,
      entities: [User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      formatError: (error: GraphQLError) => {
        const logger = new EmojiLogger();

        const originalError: {
          statusCode?: number;
        } = error.extensions.originalError;

        const exception: {
          stacktrace?: string;
        } = error.extensions;

        const stackTrace: string = exception.stacktrace;
        logger.error(error.message, stackTrace);

        const graphQLFormattedError = {
          message: error.message,
        };

        if (originalError && originalError.statusCode) {
          graphQLFormattedError['statusCode'] = originalError.statusCode;
        }
        return graphQLFormattedError;
      },
    }),
    UserModule,
    AuthModule,
    WebsocketsGatewayModule,
  ],
})
export class AppModule {}
