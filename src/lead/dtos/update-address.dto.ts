import { PartialType } from '@nestjs/mapped-types';

import { CreateAddressDTO } from 'src/lead/dtos/create-address.dto';

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}
