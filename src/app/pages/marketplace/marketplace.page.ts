import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';
import {Observable, Subscription} from 'rxjs';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import {GA_ID, StorageConsts} from '../../providers/constants';
import {Storage} from '@ionic/storage';

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
              private changeRef: ChangeDetectorRef,
              private ga: GoogleAnalytics,
              private storage: Storage) { }

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

    this.trackWithGoogle();
  }

  ngOnDestroy(): void {
    this.marketplaceTaskSubscription.unsubscribe();
    this.myTaskSubscription.unsubscribe();
  }

  trackWithGoogle() {
    this.storage.get(StorageConsts.PROFILE).then(profile => {
      this.ga.startTrackerWithId(GA_ID)
        .then(() => {
          console.log('Google analytics is ready now');
          this.ga.trackView('marketplace');
          this.ga.setUserId(profile.user.username);
        })
        .catch(e => console.log('Error starting GoogleAnalytics', e));
    });
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

    modal.onDidDismiss().then(async () => {
      const loadingMarketplacePage = await this.loadingCtrl.create({
        message: 'Please wait...',
        translucent: true
      });

      await loadingMarketplacePage.present();

      this.marketplaceTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('all')
        .subscribe(tasks => this.marketplaceTasks = tasks);
      this.myTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('me')
        .subscribe(tasks => this.myTasks = tasks);

      loadingMarketplacePage.dismiss();
    });

    return await modal.present()
      .then(() => {
        this.marketplaceTaskSubscription.unsubscribe();
        this.myTaskSubscription.unsubscribe();
        return loadingRequestPage.dismiss();
      });
  }

  async doRefresh(event?) {
    this.marketplaceTaskSubscription.unsubscribe();
    this.myTaskSubscription.unsubscribe();

    const loadingMarketplacePage = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    if (typeof event === 'string') {
      await loadingMarketplacePage.present();
    }
    setTimeout(() => {
      this.marketplaceTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('all')
        .subscribe(tasks => this.marketplaceTasks = tasks);
      this.myTaskSubscription = this.marketplaceService.getMainMarketplaceRequests('me')
        .subscribe(tasks => this.myTasks = tasks);
      if (typeof event === 'string') {
        loadingMarketplacePage.dismiss();
      } else {
        event.target.complete();
      }
    }, 1000);
  }

  setFilterOption(option: string) {
    this.filterDefault = option;
    this.changeRef.detectChanges();
  }
}
