import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  // await app.get(MikroORM).getSchemaGenerator().updateSchema();
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Wibu site')
    .setDescription('Wibu site api')
    .setVersion('1.0')
    .addTag('wibu')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
