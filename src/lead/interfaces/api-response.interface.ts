import { HttpStatus } from '@nestjs/common';

export interface IApiResponse {
  status: HttpStatus;
  message: string;
  data: any;
}
