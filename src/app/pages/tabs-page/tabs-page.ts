import {Component} from '@angular/core';
import {RequestPage} from '../request/request.page';
import {LoadingController, ModalController} from '@ionic/angular';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tabSlot: string;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) {
    if (window.innerWidth >= 500) {
      this.tabSlot = 'top';
    } else {
      this.tabSlot = 'bottom';
    }
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
