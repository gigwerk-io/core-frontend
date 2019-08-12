import {User} from '../user';
import {MainProposals} from './main-proposals';

export interface MainMarketplace {
  id: number;
  customer_id: number;
  freelancer_accepted: number;
  freelancer_count: number;
  category_id: number;
  price: number;
  description: string;
  status: string;
  intensity: string;
  complete_before: number;
  image_one: string;
  image_two: string;
  image_three: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  proposals: MainProposals[];
  customer: User;
}
