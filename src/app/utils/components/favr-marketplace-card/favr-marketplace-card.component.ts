import {Component, Input, OnInit} from '@angular/core';
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
              private storage: Storage) { }

  ngOnInit() {
    this.marketplaceService.getSingleMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .subscribe((task: MainMarketplaceTask) => {
        this.storage.get(StorageConsts.PROFILE)
          .then((prof: Profile) => {
            this.userID = prof.user_id;
            this.userRole = prof.user.role;
            this.isOwner = prof.user_id === task.customer_id;
            this.isFreelancer = (this.userRole === Role.VERIFIED_FREELANCER)
              ? this.marketplaceService.checkTaskFreelancer(prof.user_id, task)
              : false;
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

  startChat(username) {
    this.chatService.startChat(username).subscribe(res => {
      this.router.navigate(['/app/room', res.id]);
    }, error => {
      this.presentToast(error.error.message);
    });
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

  async freelancerAcceptTask() {
    const freelancerAcceptingRequest = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await freelancerAcceptingRequest.present();
    const freelancerAcceptedTask = await this.marketplaceService.freelancerAcceptMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);

    await this.toastCtrl.create({
      message: freelancerAcceptedTask,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      freelancerAcceptingRequest.dismiss();
      toast.present();
    });
  }

  async customerCancelTask() {
    const customerCancel = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await customerCancel.present();
    const cancelTask = await this.marketplaceService.customerCancelMainMarketplaceRequeset(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);

    await this.toastCtrl.create({
      message: cancelTask,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      customerCancel.dismiss();
      toast.present();
    });
  }
}
