import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';
import { Address } from 'src/lead/entities/address.entity';

import { LeadRepository } from 'src/lead/repositories/lead.repository';
import { AddressRepository } from 'src/lead/repositories/address.repository';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';
import { UpdateLeadDTO } from 'src/lead/dtos/update-lead.dto';

import { ILeadService } from 'src/lead/interfaces/lead-service.interface';
import { IParams } from 'src/lead/interfaces/params.interface';

@Injectable()
export class LeadService implements ILeadService {
  constructor(
    private readonly leadRepository: LeadRepository,
    private readonly addressRepository: AddressRepository
  ) {}

  public async findAll(params: IParams): Promise<Lead[]> {
    return await this.leadRepository.findAllLeads(params);
  }

  public async findById(id: string): Promise<Lead> {
    return await this.leadRepository.findLeadById(id);
  }

  public async store(payload: CreateLeadDTO): Promise<CreateLeadDTO> {
    const lead: Lead = await this.leadRepository.storeLead(payload);
    const address: Address = await this.addressRepository.storeAddress(lead.id, payload.address);

    return { ...lead, address };
  }

  public async update(
    id: string,
    payload: UpdateLeadDTO,
  ): Promise<UpdateResult> {
    const lead: Lead = await this.leadRepository.findLeadById(id);

    if (!lead) {
      throw new NotFoundException('Error while updating lead, not found!');
    }

    return await this.leadRepository.update(id, payload);
  }

  public async destroy(id: string): Promise<DeleteResult> {
    return await this.leadRepository.destroyLead(id);
  }
}
