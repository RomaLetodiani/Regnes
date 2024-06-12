import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './Shared/AllExceptionsFilter';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { EmojiLogger } from './Shared/EmojiLogger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new EmojiLogger(),
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
    }),
  );
  await app.listen(4000);
  Logger.log(`Server running on http://localhost:4000`, 'Bootstrap');
}
bootstrap();
