import {Component} from '@angular/core';
import {RequestPage} from '../request/request.page';
import {LoadingController, ModalController} from '@ionic/angular';
import {NotificationService} from '../../utils/services/notification.service';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tabSlot: string;
  notificationCount = 0;
  friendCount = 0;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private notificationService: NotificationService) {
    if (window.innerWidth >= 500) {
      this.tabSlot = 'top';
    } else {
      this.tabSlot = 'bottom';
    }
    this.getBadges();
  }

  getBadges() {
    setTimeout(() => {
      this.notificationService.getBadgeCount().subscribe(res => {
        this.notificationCount = res.notifications;
        this.friendCount = res.friends;
      });
    }, 1000);
  }

  async openRequestPage(): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: {'isModal': true}
    });

    const loadingRequestPage = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await loadingRequestPage.present();

    return await modal.present()
      .then(() => loadingRequestPage.dismiss());
  }
}
