import {Component, OnInit} from '@angular/core';
// @ts-ignore
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
  filterInputs: any;
  filterDefault = 'all';

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController) { }

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

  async openRequestPage(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: RequestPage,
      componentProps: {'isModal': true}
    });
    return await modal.present();
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
