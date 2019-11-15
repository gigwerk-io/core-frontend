import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {RequestPage} from '../request/request.page';
import {Observable, Subscription} from 'rxjs';
import {GA_ID, Role, StorageKeys} from '../../providers/constants';
import {Storage} from '@ionic/storage';
import {PusherServiceProvider} from '../../providers/pusher.service';
import {AuthorizationToken} from '../../utils/interfaces/user-options';
import {AuthResponse} from '../../utils/interfaces/auth/auth-response';
import {AuthService} from '../../utils/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'marketplace',
  templateUrl: './marketplace.page.html',
  styleUrls: ['./marketplace.page.scss']
})
export class MarketplacePage implements OnInit, OnDestroy {

  marketplaceTasks: MainMarketplaceTask[];
  filterInputs: any;
  filterDefault: string;
  segment = 'all';
  userRole;
  Role = Role;

  constructor(private marketplaceService: MarketplaceService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private changeRef: ChangeDetectorRef,
              private storage: Storage,
              private pusher: PusherServiceProvider,
              private authService: AuthService,
              private navCtrl: NavController,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
    this.segmentChanged(this.segment);
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
      }, error => {
        if (error.status === 401) {
          this.authService.isValidToken().subscribe(res => {
            if (!res.response) {
              this.presentToast('You have been logged out.');
              this.storage.remove(StorageKeys.PROFILE);
              this.storage.remove(StorageKeys.ACCESS_TOKEN);
              this.navCtrl.navigateRoot('/welcome');
            }
          });
        }
      });
  }

  async presentToast(message) {
    await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  getMyMarketplaceRequests() {
    this.marketplaceService.getMainMarketplaceRequests('me')
      .subscribe(tasks => {
        this.marketplaceTasks = tasks;
        this.changeRef.detectChanges();
      }, error => {
        if (error.status === 401) {
          this.authService.isValidToken().subscribe(res => {
            if (!res.response) {
              this.presentToast('You have been logged out.');
              this.storage.remove(StorageKeys.PROFILE);
              this.storage.remove(StorageKeys.ACCESS_TOKEN);
              this.navCtrl.navigateRoot('/welcome');
            }
          });
        }
      });
  }

  getMyJobs() {
    this.marketplaceService.getMainMarketplaceRequests('proposals')
      .subscribe(tasks => {
        this.marketplaceTasks = tasks;
        this.changeRef.detectChanges();
      }, error => {
        if (error.status === 401) {
          this.authService.isValidToken().subscribe(res => {
            if (!res.response) {
              this.presentToast('You have been logged out.');
              this.storage.remove(StorageKeys.PROFILE);
              this.storage.remove(StorageKeys.ACCESS_TOKEN);
              this.navCtrl.navigateRoot('/welcome');
            }
          });
        }
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

  async openRequestPage() {
    this.storage.get(StorageKeys.CUSTOMER_TUTORIAL).then(res => {
      setTimeout(async () => {
        if (!res) {
          this.router.navigateByUrl('/app/customer-tutorial');
          await Promise.resolve(false);
        } else {
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

          await modal.present()
            .then(() => {

              return loadingRequestPage.dismiss();
            });
        }
      }, 0);
    });
  }

  async doRefresh(event?) {
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
