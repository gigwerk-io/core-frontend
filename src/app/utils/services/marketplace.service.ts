import { Injectable } from '@angular/core';
import {
  CustomerCancelTaskResponse,
  FreelancerAcceptMainMarketplaceTaskRouteResponse,
  MainMarketplaceRequestRouteResponse,
  MainMarketplaceRouteResponse,
  MainMarketplaceTask
} from '../interfaces/main-marketplace/main-marketplace-task';
import {Observable, from} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {API_ADDRESS, StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../interfaces/user-options';
import {MainProposal} from '../interfaces/main-marketplace/main-proposal';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private httpClient: HttpClient,
              private storage: Storage) {
  }

  public getSingleMainMarketplaceRequest(id: number): Promise<MainMarketplaceTask> {
    return this.storage.get(StorageConsts.ACCESS_TOKEN)
        .then(token => {
          const authHeader: AuthorizationToken = {
            headers: {
              Authorization: (token) ? token : ''
            }
          };
          return this.httpClient.get<MainMarketplaceTask>(`${API_ADDRESS}/marketplace/main/request/${id}`, authHeader)
            .toPromise()
            .then((res: MainMarketplaceTask) => res);
        });
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

  public freelancerAcceptMainMarketplaceRequest(id: number): Promise<string> {
    return this.storage.get(StorageConsts.ACCESS_TOKEN)
      .then(token => {
        const authHeader: AuthorizationToken = {
          headers: {
            Authorization: (token) ? token : ''
          }
        };
        // tslint:disable-next-line
        return this.httpClient.get<FreelancerAcceptMainMarketplaceTaskRouteResponse>(`${API_ADDRESS}/marketplace/main/accept/${id}`, authHeader)
          .toPromise()
          .then((res: FreelancerAcceptMainMarketplaceTaskRouteResponse) => res.message);
      });
  }

  public customerCancelMainMarketplaceRequeset(id: number): Promise<string> {
    return this.storage.get(StorageConsts.ACCESS_TOKEN)
      .then(token => {
        const authHeader: AuthorizationToken = {
          headers: {
            Authorization: (token) ? token : ''
          }
        };

        return this.httpClient.get<CustomerCancelTaskResponse>(`${API_ADDRESS}/marketplace/main/request/cancel/${id}`, authHeader)
          .toPromise()
          .then((res: CustomerCancelTaskResponse) => res.message);
      });
  }

  public checkIsTaskFreelancer(userID: number, task: MainMarketplaceTask): boolean {
    const proposals: MainProposal[] = task.proposals;
    return proposals.find((proposal: MainProposal) => proposal.user_id === userID) !== undefined;
  }
}
