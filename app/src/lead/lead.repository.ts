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
  public async findAll(params: object): Promise<Lead[]> {
    return await this.find({ where: params });
  }

  public async findById(id: string): Promise<Lead> {
    return await this.findById(id);
  }

  public async store(payload: CreateLeadDTO): Promise<Lead> {
    return await this.create(payload);
  }

  public async update(
    id: string,
    payload: UpdateLeadDTO,
  ): Promise<UpdateResult> {
    return await this.update(id, payload);
  }

  public async destroy(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
