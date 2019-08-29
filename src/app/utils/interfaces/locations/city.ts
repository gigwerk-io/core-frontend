import {State} from './state';

export interface City {
  id?: number;
  name?: string;
  state?: State;
  description?: string;
  src?: string;
}
