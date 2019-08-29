import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utils/services/auth.service';
import { Storage } from '@ionic/storage';
import {StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../../utils/interfaces/user-options';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService: AuthService,
              private storage: Storage,
              private  navCtrl: NavController) { }

  ngOnInit() {
  }

  onLogout() {
    this.storage.get(StorageConsts.ACCESS_TOKEN)
      .then(token => {
        const authHeaders: AuthorizationToken = {
          headers: {
            Authorization: token
          }
        };
        this.authService.logout(authHeaders)
          .subscribe(res => {
            console.log(res);
            this.navCtrl.navigateRoot('/welcome');
          });
      });
  }
}
