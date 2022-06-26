const { GALAXPAY_URL }: NodeJS.ProcessEnv = process.env;

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RmqContext } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  accessTokenBody,
  accessTokenHeaders,
} from 'src/services/galaxpay/constants/generate-access-token.constant';

import { IGenerateAccesstoken } from 'src/services/galaxpay/interfaces/generate-access-token.interface';

import { CreateCustomerDTO } from 'src/services/galaxpay/dtos/create-customer.dto';

import { CreateLeadDTO } from 'src/lead/dtos/create-lead.dto';

@Injectable()
export class GalaxpayService {
  private readonly url: string = GALAXPAY_URL;

  constructor(private readonly httpService: HttpService) {}

  public async storeClient(
    payload: CreateLeadDTO,
    context: RmqContext,
  ): Promise<void> {
    const url = `${this.url}/customers`;
    const data = this.prepareBody(payload);
    const headers = await this.prepareAccessToken();

    const response = await lastValueFrom(
      this.httpService
        .post(url, data, { headers })
        .pipe(map((response) => response.data)),
    );

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    if (response.type) {
      channel.ack(originalMessage);
    } else {
      channel.nack(originalMessage, false, false)
    }
  }

  private prepareBody(payload: CreateLeadDTO): CreateCustomerDTO {
    return {
      myId: payload.id,
      name: payload.name,
      document: payload.identifier,
      emails: [payload.email],
      phones: [String(payload.phone)],
      Address: payload.address,
    };
  }

  private async generateAccessToken(): Promise<IGenerateAccesstoken> {
    const url = `${this.url}/token`;
    const data = accessTokenBody;
    const headers = accessTokenHeaders();

    return await lastValueFrom(
      this.httpService
        .post(url, data, { headers })
        .pipe(map((response) => response.data)),
    );
  }

  private async prepareAccessToken() {
    const data: IGenerateAccesstoken = await this.generateAccessToken();
    const Authorization = `Bearer ${data.access_token}`;

    return { Authorization };
  }
}
