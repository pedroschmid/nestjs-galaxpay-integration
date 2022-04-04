import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EStatus } from 'src/lead/enums/status.enum';
import { ESubscriptionTier } from 'src/lead/enums/subscription-status.enum';
import { CreateAddressDTO } from 'src/lead/dtos/create-address.dto';

export class CreateLeadDTO {
  @IsOptional()
  public id: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsNumber()
  public phone: number;

  @IsNotEmpty()
  @IsString()
  public identifier: string;

  @IsNotEmpty()
  @IsEnum(ESubscriptionTier)
  public subscriptionTier: ESubscriptionTier;

  @IsNotEmpty()
  @IsEnum(EStatus)
  public status: EStatus;

  public address: CreateAddressDTO;
}
