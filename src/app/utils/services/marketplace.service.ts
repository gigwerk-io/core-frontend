import { Injectable } from '@angular/core';
import {MainMarketplaceTask} from '../interfaces/main-marketplace/main-marketplace-task';
import {MAIN_MARKETPLACE_REQS} from '../mocks/mock-requests.mock';
import {Observable, of} from 'rxjs';
import {UserData} from '../../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(public userData: UserData) { }

  public getMainMarketplaceRequests(): Observable<MainMarketplaceTask[]> {
    const isLoggedIn: Promise<boolean> = this.userData.isLoggedIn()
      .then((val) => val)
      .catch((val) => val);

    if (isLoggedIn) {
      return of(MAIN_MARKETPLACE_REQS);
    } else {
      return of([]);
    }
  }
}
