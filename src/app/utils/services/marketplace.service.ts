import { Injectable } from '@angular/core';
import {
  MainMarketplaceRequestRouteResponse,
  MainMarketplaceRouteResponse,
  MainMarketplaceTask
} from '../interfaces/main-marketplace/main-marketplace-task';
import {MAIN_MARKETPLACE_REQS} from '../mocks/mock-requests.mock';
import {Observable, of, from} from 'rxjs';
import {UserData} from '../../providers/user-data';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {API_ADDRESS, StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../interfaces/user-options';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private httpClient: HttpClient,
              private storage: Storage,
              public userData: UserData) {
  }

  public getSingleMarketplaceRequest(id: number): Observable<MainMarketplaceTask> {
    return from(
      this.storage.get(StorageConsts.ACCESS_TOKEN)
        .then(token => {
          const authHeader: AuthorizationToken = {
            headers: {
              Authorization: (token) ? token : ''
            }
          };
          return this.httpClient.get<MainMarketplaceTask>(`${API_ADDRESS}/marketplace/main/request/${id}`, authHeader)
            .toPromise()
            .then((res: MainMarketplaceTask) => res);
        })
    );
  }

  public getMainMarketplaceRequests(filter?: string): Observable<MainMarketplaceTask[]> {
    switch (filter) {
      case 'all':
        return from(
          this.storage.get(StorageConsts.ACCESS_TOKEN)
            .then(token => {
              const authHeader: AuthorizationToken = {
                headers: {
                  Authorization: (token) ? token : ''
                }
              };
              return this.httpClient.get<MainMarketplaceRouteResponse>(`${API_ADDRESS}/marketplace/main/feed`, authHeader)
                .toPromise()
                .then((res: MainMarketplaceRouteResponse) => res.requests);
            })
        );
      case 'me':
        return from(
          this.storage.get(StorageConsts.ACCESS_TOKEN)
            .then(token => {
              const authHeader: AuthorizationToken = {
                headers: {
                  Authorization: (token) ? token : ''
                }
              };
              return this.httpClient.get<MainMarketplaceRouteResponse>(`${API_ADDRESS}/marketplace/main/me`, authHeader)
                .toPromise()
                .then((res: MainMarketplaceRouteResponse) => res.requests);
            })
        );
      case 'proposals':
        return from(
          this.storage.get(StorageConsts.ACCESS_TOKEN)
            .then(token => {
              const authHeader: AuthorizationToken = {
                headers: {
                  Authorization: (token) ? token : ''
                }
              };
              return this.httpClient.get<MainMarketplaceRouteResponse>(`${API_ADDRESS}/marketplace/main/proposals`, authHeader)
                .toPromise()
                .then((res: MainMarketplaceRouteResponse) => res.requests);
            })
        );
    }
  }

  public createMainMarketplaceRequest(req: MainMarketplaceTask): Promise<string> {
    return this.storage.get(StorageConsts.ACCESS_TOKEN)
      .then(token => {
        const authHeader: AuthorizationToken = {
          headers: {
            Authorization: (token) ? token : ''
          }
        };
        return this.httpClient.post<MainMarketplaceRequestRouteResponse>(`${API_ADDRESS}/marketplace/main/request`, req, authHeader)
          .toPromise()
          .then((res: MainMarketplaceRequestRouteResponse) => res.message);
      });
  }
}
