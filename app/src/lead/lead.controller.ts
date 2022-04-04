import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ClientProxy, EventPattern } from '@nestjs/microservices';

import { DeleteResult, UpdateResult } from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';

import { LeadService } from 'src/lead/lead.service';

import { IParams } from 'src/lead/interfaces/params.interface';
import { IApiResponse } from 'src/lead/interfaces/api-response.interface';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';
import { UpdateLeadDTO } from 'src/lead/dtos/update-lead.dto';
import { GalaxpayService } from 'src/services/galaxpay/galaxpay.service';

@Controller('leads')
export class LeadController {
  constructor(
    private readonly leadService: LeadService,
    private readonly galaxpayService: GalaxpayService,
    @Inject('RABBITMQ_CLIENT') private readonly rabbitMQClient: ClientProxy,
  ) {}

  // HTTP
  @Get()
  public async findAll(@Query() params: IParams): Promise<IApiResponse> {
    const data: Lead[] = await this.leadService.findAll(params);
    const message = 'Listing leads!';

    return this.apiResponse({ status: HttpStatus.OK, message, data });
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<IApiResponse> {
    const data: Lead = await this.leadService.findById(id);
    const message = `Listing lead ${id}`;

    return this.apiResponse({ status: HttpStatus.OK, message, data });
  }

  @Post()
  public async store(@Body() payload: CreateLeadDTO): Promise<IApiResponse> {
    const data: Lead = await this.leadService.store(payload);
    const message = 'Creating lead!';

    const assignedPayload = Object.assign(payload, {
      id: data.id,
    }) as CreateLeadDTO;

    this.rabbitMQClient.emit('store-client-galaxpay', assignedPayload);

    return this.apiResponse({ status: HttpStatus.CREATED, message, data });
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() payload: UpdateLeadDTO,
  ): Promise<IApiResponse> {
    const data: UpdateResult = await this.leadService.update(id, payload);
    const message = `Updating lead ${id}`;

    return this.apiResponse({ status: HttpStatus.OK, message, data });
  }

  @Delete(':id')
  public async destroy(@Param('id') id: string): Promise<IApiResponse> {
    const data: DeleteResult = await this.leadService.destroy(id);
    const message = `Destroying lead ${id}`;

    return this.apiResponse({ status: HttpStatus.OK, message, data });
  }

  // RABBITMQ
  @EventPattern('store-client-galaxpay')
  public async storeClientGalaxpay(payload: CreateLeadDTO) {
    await this.galaxpayService.storeClient(payload);
  }

  private apiResponse({ status, message, data }: IApiResponse): IApiResponse {
    const response: IApiResponse = { status, message, data };
    return response;
  }
}
