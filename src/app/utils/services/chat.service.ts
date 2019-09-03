import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {API_ADDRESS, StorageConsts} from '../../providers/constants';
import {MainMarketplaceTask} from '../interfaces/main-marketplace/main-marketplace-task';
import {from} from 'rxjs/index';
import {Storage} from '@ionic/storage';
import {AuthorizationToken} from '../interfaces/user-options';
import {Room} from '../interfaces/chat/room';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient, private storage: Storage) { }

  public getChatRooms() {
    return from(
      this.storage.get(StorageConsts.ACCESS_TOKEN)
        .then(token => {
          const authHeader: AuthorizationToken = {
            headers: {
              Authorization: (token) ? token : ''
            }
          };
          return this.http.get(API_ADDRESS + '/rooms', authHeader)
            .toPromise()
            .then((res) => res);
        })
    );
  }
}
