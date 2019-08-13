import {Component, OnInit, ViewChild} from '@angular/core';
import {MainMarketplace} from '../../interfaces/main-marketplace/main-marketplace';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss'],
})
export class MarketplacePage implements OnInit {

  // @ts-ignore
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  requests: MainMarketplace[];
  visibleRequests: MainMarketplace[];

  constructor(private marketplaceService: MarketplaceService) { }

  ngOnInit() {
    this.getRequests();
    this.visibleRequests = [this.requests.pop()];
  }

  getRequests(): void {
    this.marketplaceService.getMainMarketplaceRequests()
      .subscribe(requests => this.requests = requests);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      this.visibleRequests.push(this.requests.pop());
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.requests.length === 0) {
        event.target.disabled = true;
      }
    }, 500);
  }

  scrollHandler(event: Event) {
    console.log(event);
  }
}
