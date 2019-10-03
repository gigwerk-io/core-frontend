import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss']
})
export class MarketplacePage implements OnInit, OnDestroy {

  marketplaceTaskSubscription: Subscription;
  myTaskSubscription: Subscription;
  marketplaceTasks: MainMarketplaceTask[];
  myTasks: MainMarketplaceTask[];
  filterInputs: any;
  filterDefault: string;

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.marketplaceTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('all')
      .subscribe(tasks => this.marketplaceTasks = tasks);
    this.myTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('me')
      .subscribe(tasks => {
        this.myTasks = tasks;
        this.filterInputs = [
          {
            type: 'radio',
            label: 'All',
            value: 'all',
            checked: (this.myTasks.length === 0)
          },
          {
            type: 'radio',
            label: 'Just Me',
            value: 'me',
            checked: (this.myTasks.length > 0)
          }
        ];

        this.filterDefault = (this.myTasks.length > 0) ? 'me' : 'all';
      });
  }

  ngOnDestroy(): void {
    this.marketplaceTaskSubscription.unsubscribe();
    this.myTaskSubscription.unsubscribe();
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
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  setFilterOption(option: string) {
    this.filterDefault = option;
    this.changeRef.detectChanges();
  }
}
