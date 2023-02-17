import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`http://localhost:4200`]
  })
  const config = new DocumentBuilder()
    .setTitle('Todo app')
    .setDescription('Todo app API description')
    .setVersion('1.0')
    .addTag('My todo app')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then();
