import {Component, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {ModalController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  requests: MainMarketplaceTask[];

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.marketplaceService.getMainMarketplaceRequests()
      .subscribe(requests => this.requests = requests);
  }

  async openRequestPage(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: {'isModal': true}
    });
    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
