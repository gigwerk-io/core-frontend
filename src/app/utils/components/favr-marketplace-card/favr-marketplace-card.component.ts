import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  MainMarketplaceTask
} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {Events, LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {MarketplaceService} from '../../services/marketplace.service';
import {TaskActions} from '../../../providers/constants';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit, OnDestroy {

  @Input() mainMarketplaceTask: MainMarketplaceTask;
  @Output() taskActionTaken: EventEmitter<string> = new EventEmitter();

  constructor(private photoViewer: PhotoViewer,
              private loadingCtrl: LoadingController,
              private router: Router,
              private marketplaceService: MarketplaceService,
              private chatService: ChatService,
              private toastCtrl: ToastController,
              private changeRef: ChangeDetectorRef,
              private events: Events) {
    this.events.subscribe('task-action', (action, taskID) => {
      if (this.mainMarketplaceTask.id === taskID) {
        switch (action) {
          case TaskActions.FREELANCER_ACCEPT_TASK:
            this.mainMarketplaceTask.action = 3;
            this.changeRef.detectChanges();
            break;
          case TaskActions.FREELANCER_WITHDRAW_TASK:
            this.mainMarketplaceTask.action = 2;
            this.changeRef.detectChanges();
            break;
          case TaskActions.CUSTOMER_CANCEL_TASK:
            this.taskActionTaken.emit(TaskActions.CUSTOMER_CANCEL_TASK);
            break;
        }
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.events.unsubscribe('task-action');
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }

  async loadMarketplaceDetail(id: number): Promise<boolean> {
    const loadingMarketplaceDetail = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await loadingMarketplaceDetail.present();

    return this.router.navigateByUrl('/app/marketplace-detail/' + id)
      .then(() => loadingMarketplaceDetail.dismiss());
  }

  async presentToast(message) {
    await this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
      this.marketplaceService.getSingleMainMarketplaceRequest(this.mainMarketplaceTask.id)
        .then((task) => {
          this.mainMarketplaceTask = task;
          this.changeRef.detectChanges();
        });
    });
  }

  startChat(username) {
    this.chatService.startChat(username).subscribe(res => {
      this.router.navigate(['/app/room', res.id]);
    }, error => {
      this.presentToast(error.error.message);
    });
  }

  async freelancerAcceptTask() {
    const freelancerAcceptedTask = await this.marketplaceService.freelancerAcceptMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(freelancerAcceptedTask)
      .then(() => this.taskActionTaken.emit('freelancerAcceptTask'));
  }

  async freelancerWithdrawTask() {
    const freelancerWithdrawTask = await this.marketplaceService.freelancerWithdrawMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(freelancerWithdrawTask)
      .then(() => this.taskActionTaken.emit('freelancerWithdrawTask'));
  }

  async customerCancelTask() {
    const cancelTask = await this.marketplaceService.customerCancelMainMarketplaceRequeset(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(cancelTask)
      .then(() => this.taskActionTaken.emit('customerCancelTask'));
  }
}
