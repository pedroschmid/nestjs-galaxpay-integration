import { ESubscriptionTier } from 'src/lead/enums/subscription-status.enum';
import { EStatus } from 'src/lead/enums/status.enum';

export interface IParams {
  id?: string;
  name?: string;
  email?: string;
  phone?: number;
  identifier?: string;
  subscriptionTier?: ESubscriptionTier;
  status?: EStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
