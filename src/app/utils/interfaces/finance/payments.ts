import {MainMarketplaceTask} from '../main-marketplace/main-marketplace-task';
import {User} from '../user';

export interface CardSavedResponse {
  message: string;
}

export interface PaymentsResponse {
  payments: Payments[];
}

export interface Payments {
  marketplace_id: number;
  customer_id: number;
  amount: number;
  refunded: boolean;
  created_at: string;
  updated_at: string;
  marketplace: MainMarketplaceTask;
  customer: User;
}
