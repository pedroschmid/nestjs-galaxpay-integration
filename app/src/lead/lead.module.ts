import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LeadRepository } from 'src/lead/lead.repository';
import { LeadController } from 'src/lead/lead.controller';
import { LeadService } from 'src/lead/lead.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GalaxpayService } from 'src/services/galaxpay/galaxpay.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeadRepository]),
    HttpModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'leads_queue',
          noAck: true,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService, GalaxpayService],
})
export class LeadModule {}
