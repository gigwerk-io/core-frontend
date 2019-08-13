import { Injectable } from '@angular/core';
import {MainMarketplace} from '../../interfaces/main-marketplace/main-marketplace';
import {MAIN_MARKETPLACE_REQS} from '../mocks/mock-requests.mock';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor() { }

  public getMainMarketplaceRequests(): Observable<MainMarketplace[]> {
    return of(MAIN_MARKETPLACE_REQS);
  }
}
