import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../utils/services/auth.service';
import { Storage } from '@ionic/storage';
import {INTERCOM_ID, StorageConsts} from '../../providers/constants';
import {AuthorizationToken} from '../../utils/interfaces/user-options';
import {ActionSheetController, NavController, Platform} from '@ionic/angular';
import {Intercom} from '@ionic-native/intercom/ngx';
import {Intercom as WebIntercom} from 'ng-intercom';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';


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
              private iab: InAppBrowser,
              private socialSharing: SocialSharing,
              public actionSheetController: ActionSheetController,
              private contacts: Contacts) { }

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

    console.log(this.platform.platforms());
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
    this.storage.get(StorageConsts.PROFILE).then(profile => {
      this.webIntercom.boot({
        app_id: INTERCOM_ID,
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

  async inviteFriends() {
    const message = 'Get $10 off your first FAVR job when you use my signup link!';
    const url = 'https://askfavr.com/10off/';
    const buttons = [
      {
        text: 'Share via Facebook',
        icon: 'logo-facebook',
        handler: () => {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        }
      },  {
        text: 'Share via Text',
        icon: 'text',
        handler: () => {
          window.open(`sms://?&body=${message + ' ' + url}`);
        }
      }, {
        text: 'Share via Twitter',
        icon: 'logo-twitter',
        handler: () => {
          window.open(`https://twitter.com/intent/tweet?url=${url}&text=${message + ' ' + url}`);
        }
      }, {
        text: 'Share via Email',
        icon: 'mail',
        handler: () => {
          window.open(`mailto:?&subject=${'Invitation To FAVR!'}&body=${message + ' ' + url}`);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }];
    if (!this.platform.is('mobile')) {
      buttons.splice(1, 1); // remove text option if not mobile
    }
    const actionSheet = await this.actionSheetController.create({
      header: 'Earn $5 For Each Friend You Invite To FAVR!',
      buttons: buttons
    });
    await actionSheet.present();
  }
}
