import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { Events, MenuController, Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import {StorageKeys} from './providers/constants';
import {toggleDarkTheme} from './pages/settings/settings.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.splashScreen.hide();
      this.storage.get(StorageKeys.THEME_PREFERENCE)
        .then((prefersDark: boolean) => {
          if (prefersDark) {
            this.statusBar.backgroundColorByHexString('#222428');
            toggleDarkTheme(prefersDark);
          } else {
            this.statusBar.backgroundColorByHexString('#ff6500');
            toggleDarkTheme(false);
          }
          // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
          // prefersDark.addEventListener('dark-theme-listener', (mediaQuery: MediaQueryListEvent) => toggleDarkTheme(mediaQuery.matches));
        });
    });
  }
}
