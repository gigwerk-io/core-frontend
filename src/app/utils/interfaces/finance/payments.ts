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
}
