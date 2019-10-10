import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';
import {Observable, Subscription} from 'rxjs';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import {GA_ID, Role, StorageConsts} from '../../providers/constants';
import {Storage} from '@ionic/storage';
import {PusherServiceProvider} from '../../providers/pusher.service';

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
  segment = 'all';
  userRole;
  Role = Role;

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private changeRef: ChangeDetectorRef,
              private ga: GoogleAnalytics,
              private storage: Storage,
              private pusher: PusherServiceProvider) {  }

  ngOnInit() {
    this.segmentChanged(this.segment);
    this.trackWithGoogle();
  }

  ngOnDestroy(): void {}

  getAllMarketplaceRequests() {
    this.marketplaceService.getMainMarketplaceRequests('all')
      .subscribe(tasks => {
        this.marketplaceTasks = tasks;
        const channel = this.pusher.marketplace();
        channel.bind('new-request', data => {
          this.marketplaceTasks.push(data.marketplace);
          // console.log(data.marketplace);
        });
        this.changeRef.detectChanges();
      });
  }

  getMyMarketplaceRequests() {
    this.marketplaceService.getMainMarketplaceRequests('me')
      .subscribe(tasks => {
        this.marketplaceTasks = tasks;
        this.changeRef.detectChanges();
      });
  }

  getMyJobs() {
    this.marketplaceService.getMainMarketplaceRequests('proposals')
      .subscribe(tasks => {
        this.marketplaceTasks = tasks;
        this.changeRef.detectChanges();
      });
  }

  segmentChanged(value) {
    switch (value) {
      case 'all':
        this.segment = 'all';
        this.getAllMarketplaceRequests();
        break;
      case 'me':
        this.segment = 'me';
        this.getMyMarketplaceRequests();
        break;
      case 'jobs':
        this.segment = 'jobs';
        this.getMyJobs();
        break;
    }
  }

  trackWithGoogle() {
    this.storage.get(StorageConsts.PROFILE).then(profile => {
      this.userRole = profile.user.role;
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

      // this.marketplaceService.getMainMarketplaceRequests('all')
      //   .then(tasks => this.marketplaceTasks = tasks);
      // this.marketplaceService.getMainMarketplaceRequests('me')
      //   .then(tasks => this.marketplaceTasks = tasks);
      this.doRefresh();
      loadingMarketplacePage.dismiss();
    });

    return await modal.present()
      .then(() => {

        return loadingRequestPage.dismiss();
      });
  }

  async doRefresh(event?) {
    // if (typeof event.target.value === 'string') {
    //   await loadingMarketplacePage.present();
    // }
    setTimeout(() => {
      switch (this.segment) {
        case 'all':
          this.getAllMarketplaceRequests();
          break;
        case 'me':
          this.getMyMarketplaceRequests();
          break;
        case 'jobs':
          this.getMyJobs();
          break;
      }

      if (event) {
        if (event.target) {
          event.target.complete();
        }
      }
    }, 1000);
  }

  setFilterOption(option: string) {
    this.filterDefault = option;
    this.changeRef.detectChanges();
  }
}
