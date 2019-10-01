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

export const TaskStatus = {
  REQUESTED: 'Requested',
  PENDING_APPROVAL: 'Pending Approval',
  PAID: 'Paid',
  IN_PROGRESS: 'In Progress',
  COMPLETE: 'Complete'
};

export const API_ADDRESS =  environment.apiUrl;
export const PUSHER_ID = environment.pusherId;
export const STRIPE_PUBLIC = environment.stripeKey;
export const GA_ID = environment.googleAnalyticsId;
export const INTERCOM_ID = environment.intercomId;
