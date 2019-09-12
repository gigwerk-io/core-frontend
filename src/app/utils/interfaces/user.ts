// @ts-ignore
import {MainMarketplaceTask} from './main-marketplace/main-marketplace-task';
import {MainProposals} from './main-marketplace/main-proposals';
// @ts-ignore
import {FriendMarketplaceTask} from './friend-marketplace/friend-marketplace-task';
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
  main_marketplace?: MainMarketplaceTask[];
  friend_marketplace?: FriendMarketplaceTask[];
  friend_proposals?: FriendProposals[];
  main_proposals?: MainProposals[];
  profile?: Profile;
}

export interface ProfileRouteResponse {
  user: {
    user_id?: number;
    image?: string;
    description?: string;
    created_at?: number;
    updated_at?: number;
    rating?: number;
    customer_rating?: number;
    user: {
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
      main_marketplace?: MainMarketplaceTask[];
      friend_marketplace?: FriendMarketplaceTask[];
      friend_proposals?: FriendProposals[];
      main_proposals?: MainProposals[];
    };
  };
}

export interface Profile {
  user_id?: number;
  image?: string;
  description?: string;
  created_at?: number;
  updated_at?: number;
  rating?: number;
  customer_rating?: number;
}
