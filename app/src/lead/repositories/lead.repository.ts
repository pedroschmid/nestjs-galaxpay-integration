import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Lead } from 'src/lead/entities/lead.entity';

import { ILeadRepository } from 'src/lead/interfaces/lead-repository.interface';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';
import { UpdateLeadDTO } from 'src/lead/dtos/update-lead.dto';

@EntityRepository(Lead)
export class LeadRepository
  extends Repository<Lead>
  implements ILeadRepository
{  
  public async findAllLeads(params: object): Promise<Lead[]> {
    return await this.find({ where: params });
  }

  public async findLeadById(id: string): Promise<Lead> {
    return await this.findOne(id);
  }

  public async storeLead(payload: CreateLeadDTO): Promise<Lead> {
    const existingLead: Lead = await this.alreadyExists(payload.email);

    const entity = this.create(payload);

    if (!existingLead) {
      await this.save(entity);
    } else {
      await this.update(existingLead.id, entity);
    }

    return await this.findOne({ where: { email: payload.email }});
  }

  public async updateLead(
    id: string,
    payload: UpdateLeadDTO,
  ): Promise<UpdateResult> {
    return await this.update(id, payload);
  }

  public async destroyLead(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }

  private async alreadyExists(email: string): Promise<Lead> {
    const existingLead = await this.findOne({ where: { email }});

    if (existingLead) {
      return existingLead;
    }

    return null;
  }
}
