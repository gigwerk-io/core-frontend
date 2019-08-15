import {MainMarketplace} from './main-marketplace/main-marketplace';
import {MainProposals} from './main-marketplace/main-proposals';
import {FriendMarketplace} from './friend-marketplace/friend-marketplace';
import {FriendProposals} from './friend-marketplace/friend-proposals';

export interface User {
  id?: number;
  username?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: number;
  twilio_phone?: number;
  birthday?: number;
  city_id?: number;
  is_admin?: boolean;
  credit_amount?: number;
  intercom_id?: number;
  email_verified_at?: number;
  created_at?: number;
  updated_at?: number;
  deleted_at?: number;
  main_marketplace?: MainMarketplace[];
  friend_marketplace?: FriendMarketplace[];
  friend_proposals?: FriendProposals[];
  main_proposals?: MainProposals[];
  profile?: {
    user_id?: number;
    image?: string;
    description?: string;
    created_at?: number;
    updated_at?: number;
    rating?: number;
    customer_rating?: number;
  };
}
