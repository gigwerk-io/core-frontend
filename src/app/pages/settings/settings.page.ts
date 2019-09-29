import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utils/services/auth.service';
import { Storage } from '@ionic/storage';
import {StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../../utils/interfaces/user-options';
import {NavController, Platform} from '@ionic/angular';
import {Intercom} from '@ionic-native/intercom/ngx';
import {Intercom as WebIntercom} from 'ng-intercom';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  seeCredit: boolean;
  seeTransfers: boolean;
  constructor(private authService: AuthService,
              private storage: Storage,
              private  navCtrl: NavController,
              private intercom: Intercom,
              private platform: Platform,
              private webIntercom: WebIntercom,
              private iab: InAppBrowser) { }

  ngOnInit() {
    this.storage.get(StorageConsts.PROFILE).then(profile => {
      if (profile.user.role === 'Verified Freelancer') {
        this.seeTransfers = true;
      } else {
        this.seeTransfers = false;
      }

      if (profile.user.organization_id === null) {
        this.seeCredit = true;
      } else {
        this.seeCredit = false;
      }
    });
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

  openSupport() {
    if (this.platform.is('ios') || this.platform.is('android')){
      this.intercom.registerForPush();
    } else {
      this.storage.get(StorageConsts.PROFILE).then(profile => {
        this.webIntercom.boot({
          app_id: 'yvoar9nd',
          email: profile.user.email,
          name: profile.user.first_name + " " + profile.user.last_name,
          // Supports all optional configuration.
          widget: {
            "activator": "#intercom"
          }
        });
        this.webIntercom.show();
      });

    }
  }

  openTerms() {
    if (this.platform.is('ios') || this.platform.is('android')){
      this.iab.create('https://askfavr.com/terms.html');
    } else {
      window.open('https://askfavr.com/terms.html');
    }
  }

  openPrivacy() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.iab.create('https://app.termly.io/document/privacy-policy/f48f5cbe-6359-43b5-804f-4d8b82429fe6');
    } else {
      window.open('https://app.termly.io/document/privacy-policy/f48f5cbe-6359-43b5-804f-4d8b82429fe6');
    }
  }
}
