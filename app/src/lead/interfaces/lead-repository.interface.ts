import { DeleteResult, UpdateResult } from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';
import { UpdateLeadDTO } from 'src/lead/dtos/update-lead.dto';

export interface ILeadRepository {
  findAllLeads(params: object): Promise<Lead[]>;
  findLeadById(id: string): Promise<Lead>;
  storeLead(payload: CreateLeadDTO): Promise<Lead>;
  updateLead(id: string, payload: UpdateLeadDTO): Promise<UpdateResult>;
  destroyLead(id: string): Promise<DeleteResult>;
}
