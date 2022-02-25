import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: LoggerService = new LoggerService();

  const config = new DocumentBuilder()
    .setTitle('Worldwide Holidays')
    .setDescription('The Free Worldwide Holidays API.')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors();

  logger.verbose(
    `Application listening on port => ${configService.get('port')}`,
    'Main',
  );
  await app.listen(configService.get('port'));
}
bootstrap();
