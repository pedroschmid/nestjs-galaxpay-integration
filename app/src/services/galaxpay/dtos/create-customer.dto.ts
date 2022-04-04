import { CreateAddressDTO } from 'src/lead/dtos/create-address.dto';

export class CreateCustomerDTO {
  myId: string;
  name: string;
  document: string;
  emails: string[];
  phones: string[];
  Address: CreateAddressDTO;
}
