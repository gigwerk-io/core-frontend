import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import {AuthResponse} from '../interfaces/auth/auth-response';
import {UserOptions, UserRegistrationOptions} from '../interfaces/user-options';
import {StorageConsts} from '../../providers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS  =  'https://lumen.askfavr.com';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient,
              private  storage:  Storage) { }

  register(user: UserRegistrationOptions): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res) {
          await this.storage.set(StorageConsts.ACCESS_TOKEN, res.token);
          this.authSubject.next(true);
        }
      })
    );
  }

  login(user: UserOptions): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res) {
          await this.storage.set(StorageConsts.ACCESS_TOKEN, res.token);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove(StorageConsts.ACCESS_TOKEN);
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
