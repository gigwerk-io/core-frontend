import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {ProfileRouteResponse} from '../interfaces/user';
import {API_ADDRESS, StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../interfaces/user-options';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient,
              private storage: Storage) { }

  public getProfile(id: number): Observable<ProfileRouteResponse> {
    return from(
      this.storage.get(StorageConsts.ACCESS_TOKEN)
        .then(token => {
          const authHeader: AuthorizationToken = {
            headers: {
              Authorization: (token) ? token : ''
            }
          };
          return this.httpClient.get<ProfileRouteResponse>(`${API_ADDRESS}/profile/${id}`, authHeader)
            .toPromise()
            .then((res: ProfileRouteResponse) => res);
        })
    );
  }
}
