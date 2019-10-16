import {Component} from '@angular/core';
import {RequestPage} from '../request/request.page';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {NotificationService} from '../../utils/services/notification.service';
import {PusherServiceProvider} from '../../providers/pusher.service';
import {Storage} from '@ionic/storage';
import {StorageKeys} from '../../providers/constants';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tabSlot: string;
  notificationCount = 0;
  friendCount = 0;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private notificationService: NotificationService,
              private pusher: PusherServiceProvider,
              private toastController: ToastController,
              private storage: Storage,
              private router: Router) {
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
        // Listen To Pusher User Channel
        this.storage.get(StorageKeys.PROFILE).then(profile => {
          const channel = this.pusher.user(profile.user.id);
          // Bind Notification Channel
          channel.bind('notification', data => {
            this.presentToast(data.message);
            this.notificationCount = data.badges.notifications;
            this.friendCount = data.badges.friends;
          });
          // Bind Badge Channel
          channel.bind('badges', data => {
            this.notificationCount = data.badges.notifications;
            this.friendCount = data.badges.friends;
          });
        });
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

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 4000,
      color: 'dark',
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.router.navigateByUrl('/app/tabs/notifications');
          }
        }
      ]
    }).then(toast => {
      toast.present();
    });
  }
}
