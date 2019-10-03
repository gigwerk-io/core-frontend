import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserOptions } from '../../utils/interfaces/user-options';
import {AuthService} from '../../utils/services/auth.service';
import {NavController, Platform} from '@ionic/angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import {NotificationService} from '../../utils/services/notification.service';
import {GCM_KEY} from '../../providers/constants';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = {
    username: undefined,
    password: undefined
  };
  submitted = false;

  constructor(
    private authService: AuthService,
    public navCtrl: NavController,
    private push: Push,
    private notficationService: NotificationService,
    private platform: Platform
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.authService.login(this.login)
        .subscribe(() => {
          this.navCtrl.navigateRoot('/app/tabs/marketplace').then(res => {
            // to check if we have permission
            try {
              this.initPushNotification();
            } catch (e) {
              console.warn(e);
            }
          });
        });
    }
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    const options: PushOptions = {
      android: {
        sound: true
      },
      ios: {
        alert: true,
        badge: true,
        sound: true
      },
      // windows: {},
      // browser: {
      //   pushServiceURL: 'http://push.api.phonegap.com/v1/push',
      //   applicationServerKey: GCM_KEY
      // }
    };
    if (!(this.platform.is('pwa') && this.platform.is('ios'))) {
      const pushObject: PushObject = this.push.init(options);
      pushObject.on('registration').subscribe((data: any) => {
        console.log('Token: ' + data.registrationId);
        if (this.platform.is('ios')) {
          this.notficationService.saveAPNToken({'device_token': data.registrationId}).subscribe(res => {
            console.log(res);
          });
        } else if (this.platform.is('android')) {
          this.notficationService.saveFCMToken({'device_token': data.registrationId}).subscribe(res => {
            console.log(res);
          });
        }
      }, error1 => {
        console.log(error1);
      });
    }
  }
}
