import { Injectable } from '@angular/core';
// @ts-ignore
import {MainMarketplaceTask} from '../interfaces/main-marketplace/main-marketplace-task';
import {MAIN_MARKETPLACE_REQS} from '../mocks/mock-requests.mock';
import {Observable, of} from 'rxjs';
import {UserData} from '../../providers/user-data';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  isLoggedIn: Promise<boolean>;

  constructor(public userData: UserData) {
  }

  public getMainMarketplaceRequests(filter?: string): Observable<MainMarketplaceTask[]> {
    switch (filter) {
      case 'all':
        return of(MAIN_MARKETPLACE_REQS.reverse());
      case 'me':
        const myTasks: MainMarketplaceTask[] = MAIN_MARKETPLACE_REQS.filter(
          req => (req.customer_id === this.userData.userID)
            || (req.proposals.filter(
              prop => prop.user_id === this.userData.userID).length === 1));
        return of(myTasks);
    }
  }

  public createMainMarketplaceRequest(req: MainMarketplaceTask): Promise<boolean> {
    return new Promise((resolve, reject) => {
      MAIN_MARKETPLACE_REQS.push(req);
      return resolve(true);
    });
  }
}
