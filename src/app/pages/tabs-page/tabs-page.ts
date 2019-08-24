import {Component} from '@angular/core';
import {RequestPage} from '../request/request.page';
import {ModalController} from '@ionic/angular';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tabSlot: string;

  constructor(private modalCtrl: ModalController) {
    if (window.innerWidth >= 500) {
      this.tabSlot = 'top';
    } else {
      this.tabSlot = 'bottom';
    }
  }

  async openRequestPage(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: {'isModal': true}
    });
    return await modal.present();
  }
}
