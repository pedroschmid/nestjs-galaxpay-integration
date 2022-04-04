import { DeleteResult, UpdateResult } from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';
import { UpdateLeadDTO } from 'src/lead/dtos/update-lead.dto';

export interface ILeadService {
  findAll(params: object): Promise<Lead[]>;
  findById(id: string): Promise<Lead>;
  store(payload: CreateLeadDTO): Promise<Lead>;
  update(id: string, payload: UpdateLeadDTO): Promise<UpdateResult>;
  destroy(id: string): Promise<DeleteResult>;
}
