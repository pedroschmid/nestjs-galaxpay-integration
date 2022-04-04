import {
    DeleteResult,
    EntityRepository,
    Repository,
    UpdateResult,
  } from 'typeorm';
  
  import { Address } from 'src/lead/entities/address.entity';
  
  import { IAddressRepository } from 'src/lead/interfaces/address-repository.interface';
  import { CreateAddressDTO } from 'src/lead/dtos/create-address.dto';
  import { UpdateAddressDTO } from 'src/lead/dtos/update-address.dto';
  
  @EntityRepository(Address)
  export class AddressRepository
    extends Repository<Address>
    implements IAddressRepository
  {  
    public async findAllAddresses(params: object): Promise<Address[]> {
      return await this.find({ where: params });
    }
  
    public async findAddressById(id: string): Promise<Address> {
      return await this.findOne(id);
    }
  
    public async storeAddress(leadId: string, payload: CreateAddressDTO): Promise<Address> {
      const existingAddress: Address = await this.alreadyExists(payload);

      Object.assign(payload, { lead: leadId });
      const entity = this.create(payload);
  
      if (!existingAddress) {
        await this.save(entity);
      } else {
        await this.update(existingAddress.id, entity);
      }
  
      return await this.findOne({ where: payload });
    }
  
    public async updateAddress(
      id: string,
      payload: UpdateAddressDTO,
    ): Promise<UpdateResult> {
      return await this.update(id, payload);
    }
  
    public async destroyAddress(id: string): Promise<DeleteResult> {
      return await this.delete(id);
    }

    private async alreadyExists(params: CreateAddressDTO): Promise<Address> {
      const existingAddress = await this.findOne({ where: params });
  
      if (existingAddress) {
        return existingAddress;
      }
  
      return null;
    }
  }
  