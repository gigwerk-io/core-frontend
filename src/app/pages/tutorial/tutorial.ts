import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import {AuthService} from '../../utils/services/auth.service';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public menu: MenuController,
    public  authService: AuthService,
    public router: Router,
    public storage: Storage
  ) {}

  startApp() {
    this.authService.isLoggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        this.router
          .navigateByUrl('/app/tabs/marketplace')
          .then(() => this.storage.set('ion_did_tutorial', true));
      } else {
        this.router
          .navigateByUrl('/welcome')
          .then(() => this.storage.set('ion_did_tutorial', true));
      }
    });
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.authService.isLoggedIn().subscribe(loggedIn => {
          if (loggedIn) {
            this.router.navigateByUrl('/app/tabs/marketplace');
          } else {
            this.router.navigateByUrl('/welcome');
          }
        });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
