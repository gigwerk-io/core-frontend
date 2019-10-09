import {User} from '../user';
import {MainProposal} from './main-proposal';
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
  isoFormat?: number;
  postedFormat?: number;
  image_one?: string;
  image_two?: string;
  image_three?: string;
  action?: number;
  created_at?: number;
  updated_at?: number;
  deleted_at?: number;
  proposals?: MainProposal[];
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

export interface FreelancerAcceptMainMarketplaceTaskRouteResponse {
  message: string;
}

export interface FreelancerWithdrawMainMarketplaceTaskRouteResponse {
  message: string;
}

export interface CustomerCancelTaskResponse {
  message: string;
}
