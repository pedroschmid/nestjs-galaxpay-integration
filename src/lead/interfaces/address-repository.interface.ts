import { DeleteResult, UpdateResult } from 'typeorm';

import { Address } from 'src/lead/entities/address.entity';

import { CreateAddressDTO } from 'src/lead/dtos/create-address.dto';
import { UpdateAddressDTO } from 'src/lead/dtos/update-address.dto';

export interface IAddressRepository {
  findAllAddresses(params: object): Promise<Address[]>;
  findAddressById(id: string): Promise<Address>;
  storeAddress(leadId: string, payload: CreateAddressDTO): Promise<Address>;
  updateAddress(id: string, payload: UpdateAddressDTO): Promise<UpdateResult>;
  destroyAddress(id: string): Promise<DeleteResult>;
}
