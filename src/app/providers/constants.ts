import {environment} from '../../environments/environment';

export const StorageConsts = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  PROFILE: 'PROFILE'
};

export const Role = {
  VERIFIED_FREELANCER: 'Verified Freelancer',
  PENDING_FREELANCER: 'Pending Freelancer',
  CUSTOMER: 'Customer'
};

export const API_ADDRESS =  environment.apiUrl;
export const PUSHER_ID = environment.pusherId;
export const STRIPE_PUBLIC = environment.stripeKey;
