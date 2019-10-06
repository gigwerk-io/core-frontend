import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  MainMarketplaceTask
} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {Storage} from '@ionic/storage';
import {Role, StorageConsts, TaskStatus} from '../../../providers/constants';
import {Profile} from '../../interfaces/user';
import {MarketplaceService} from '../../services/marketplace.service';

@Component({
  selector: 'favr-marketplace-card',
  templateUrl: './favr-marketplace-card.component.html',
  styleUrls: ['./favr-marketplace-card.component.scss'],
  providers: [PhotoViewer]
})
export class FavrMarketplaceCardComponent implements OnInit {

  @Input() mainMarketplaceTask: MainMarketplaceTask;
  @Output() taskActionTaken: EventEmitter<string> = new EventEmitter();

  userRole: string;
  userID: number;
  isOwner: boolean;
  isFreelancer: boolean;
  TaskStatus = TaskStatus;
  Role = Role;

  constructor(private photoViewer: PhotoViewer,
              private loadingCtrl: LoadingController,
              private router: Router,
              private marketplaceService: MarketplaceService,
              private chatService: ChatService,
              private toastCtrl: ToastController,
              private storage: Storage,
              private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.marketplaceService.getSingleMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((task: MainMarketplaceTask) => {
        this.storage.get(StorageConsts.PROFILE)
          .then((prof: Profile) => {
            this.userID = prof.user_id;
            this.userRole = prof.user.role;
            this.isOwner = prof.user_id === task.customer_id;
            this.isFreelancer = (this.userRole === Role.VERIFIED_FREELANCER)
              ? this.marketplaceService.checkIsTaskFreelancer(prof.user_id, task)
              : false;
            this.changeRef.detectChanges();
          });
      });
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
