import {Component, OnInit} from '@angular/core';
import {MainMarketplace} from '../../utils/interfaces/main-marketplace/main-marketplace';
import {MarketplaceService} from '../../utils/services/marketplace.service';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  // @ts-ignore
  requests: MainMarketplace[];
  // visibleRequests: MainMarketplace[];

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests(): void {
    this.marketplaceService.getMainMarketplaceRequests()
      .subscribe(requests => this.requests = requests);
  }

  // loadData(event) {
  //   setTimeout(() => {
  //     console.log('Done');
  //     event.target.complete();
  //
  //     this.visibleRequests.push(this.requests.pop());
  //     // App logic to determine if all data is loaded
  //     // and disable the infinite scroll
  //     if (this.requests.length === 0) {
  //       event.target.disabled = true;
  //     }
  //   }, 500);
  // }
}
