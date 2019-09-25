export interface BalanceResponse {
  balance: string;
}

export interface PayoutsResponse {
  payouts: Transfers[];
}

export interface Transfers {
  marketplace_id: number;
  freelancer_id: number;
  amount: number;
  reversed: boolean;
  created_at: string;
  updated_at: string;
}

export interface OAuthResponse {
  url: string;
}
