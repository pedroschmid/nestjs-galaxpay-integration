import { ESubscriptionTier } from 'src/lead/enums/subscription-status.enum';
import { EStatus } from 'src/lead/enums/status.enum';

export interface ILeadEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  identifier: string;
  subscriptionTier: ESubscriptionTier;
  status: EStatus;
  createdAt: Date;
  updatedAt: Date;
}
