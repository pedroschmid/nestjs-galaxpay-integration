import { PartialType } from '@nestjs/mapped-types';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';

export class UpdateLeadDTO extends PartialType(CreateLeadDTO) {}
