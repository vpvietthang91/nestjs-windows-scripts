import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle('PAC windows agent')
  .setDescription('Agent run on Windows OS')
  .setVersion('1.0')
  .addTag('pac')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('agent', app, document);

  await app.listen(4444, '0.0.0.0');
}
bootstrap();
