import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../utils/services/auth.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {StorageKeys} from '../../providers/constants';

@Component({
  selector: 'customer-tutorial',
  templateUrl: './customer-tutorial.page.html',
  styleUrls: ['./customer-tutorial.page.scss'],
})
export class CustomerTutorialPage implements OnInit {

  showSkip = true;
  constructor( public menu: MenuController,
               public  authService: AuthService,
               public router: Router,
               public storage: Storage) { }

  ngOnInit() {
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  goToRequestForm() {
    this.storage.set(StorageKeys.CUSTOMER_TUTORIAL, true);
    this.router.navigateByUrl('app/tabs/marketplace');
  }
}
