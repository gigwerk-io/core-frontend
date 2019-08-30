import {User} from '../user';
import {MainProposals} from './main-proposals';
import {Location} from '../locations/location';

export interface MainMarketplaceTask {
  id?: number;
  customer_id?: number;
  freelancer_accepted?: number;
  freelancer_count?: number;
  sub_category_id?: number;
  category_id?: number;
  category_icon_image?: string;
  category?: string;
  price?: number;
  description?: string;
  status?: string;
  intensity?: string;
  complete_before?: number;
  image_one?: string;
  image_two?: string;
  image_three?: string;
  created_at?: number;
  updated_at?: number;
  deleted_at?: number;
  proposals?: MainProposals[];
  customer?: User;
  street_address?: string;
  city?: string;
  state?: string;
  zip?: string;
  date?: number;
  locations?: Location[];
}

export interface MainMarketplaceRouteResponse {
  requests: MainMarketplaceTask[];
}

export interface MainMarketplaceRequestRouteResponse {
  message: string;
  id: number;
}
