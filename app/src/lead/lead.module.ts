import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LeadRepository } from 'src/lead/repositories/lead.repository';
import { LeadController } from 'src/lead/lead.controller';
import { LeadService } from 'src/lead/lead.service';

import { AddressRepository } from 'src/lead/repositories/address.repository';

import { GalaxpayService } from 'src/services/galaxpay/galaxpay.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([LeadRepository, AddressRepository]),
    HttpModule,
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_QUEUE_NAME'),
            noAck: false,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService, GalaxpayService],
})
export class LeadModule {}
