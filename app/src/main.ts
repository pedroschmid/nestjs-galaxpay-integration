import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const PORT: number = Number(process.env.PORT) || 3000;

  const app = await NestFactory.create(AppModule);

  // RabbitMQ Connection
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'leads_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
