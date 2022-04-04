import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { LeadRepository } from 'src/lead/repositories/lead.repository';
import { LeadController } from 'src/lead/lead.controller';
import { LeadService } from 'src/lead/lead.service';

import { AddressRepository } from 'src/lead/repositories/address.repository';

import { GalaxpayService } from 'src/services/galaxpay/galaxpay.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([LeadRepository, AddressRepository]),
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
