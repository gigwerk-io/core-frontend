import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import {StorageConsts} from './constants';
@Injectable({
  providedIn: 'root'
})
export class CheckAuth implements CanActivate {
  constructor(private storage: Storage,
              private router: Router,
              private location: Location) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log(state.url);
    return this.storage.get(StorageConsts.ACCESS_TOKEN)
      .then(token => {
        if (token) {
          switch (state.url) {
            case '/app':
              this.router.navigateByUrl('/app/tabs/marketplace');
              break;
            case '/welcome':
              this.router.navigateByUrl('/app/tabs/marketplace');
              break;
            case '/login':
              this.router.navigateByUrl('/app/tabs/marketplace');
              break;
            case '/signup':
              this.router.navigateByUrl('/app/tabs/marketplace');
              break;
          }
        } else {
          if (!(state.url === '/login'
            || state.url === '/signup'
            || state.url === '/welcome')) {
            this.router.navigateByUrl('/welcome');
          }
        }
        return true;
      });
  }
}
