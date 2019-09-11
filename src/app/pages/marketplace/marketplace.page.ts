import {Component, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  requests: MainMarketplaceTask[];
  filterInputs: any;
  filterDefault = 'all';

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getRequests();
    this.filterInputs = [
      {
        type: 'radio',
        label: 'All',
        value: 'all',
        checked: true
      },
      {
        type: 'radio',
        label: 'Just Me',
        value: 'me',
        checked: false
      }
    ];
  }

  getRequests(filter: string = this.filterDefault): void {
    this.marketplaceService.getMainMarketplaceRequests(filter)
      .subscribe(requests => this.requests = requests);
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

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getRequests();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  setFilterOption(option: string) {
    this.filterDefault = option;
    this.getRequests(option);
  }
}
