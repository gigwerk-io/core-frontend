import {Component, OnInit} from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {Storage} from '@ionic/storage';
import {Role, StorageConsts, TaskStatus} from '../../providers/constants';
import {ChatService} from '../../utils/services/chat.service';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';

@Component({
  selector: 'marketplace-detail',
  templateUrl: './marketplace-detail.page.html',
  styleUrls: ['./marketplace-detail.page.scss'],
  providers: [PhotoViewer]
})
export class MarketplaceDetailPage implements OnInit {

  taskID: number;
  mainMarketplaceTask: MainMarketplaceTask;
  page = 'main';
  taskStatusDisplay: string;
  isOwner: boolean;
  isFreelancer: boolean;
  userRole: string;
  TaskStatus = TaskStatus;
  Role = Role;
  Categories = TASK_CATEGORIES;

  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private storage: Storage,
              private router: Router,
              private photoViewer: PhotoViewer,
              private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private marketplaceService: MarketplaceService,
              private actionSheetCtrl: ActionSheetController,
              private chatService: ChatService) {
    this.activatedRoute.paramMap.subscribe(data => {
      this.taskID = parseInt(data.get('id'), 10);
      this.marketplaceService.getSingleMainMarketplaceRequest(this.taskID)
        .then((task: MainMarketplaceTask) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.action === 5) ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;
          this.storage.get(StorageConsts.PROFILE)
            .then(prof => {
              this.userRole = prof.user.role;
              this.isOwner = prof.user_id === task.customer_id;
              this.isFreelancer = (this.userRole === Role.VERIFIED_FREELANCER)
                ? this.marketplaceService.checkIsTaskFreelancer(prof.user_id, this.mainMarketplaceTask)
                : false;
            });
        });
    });
  }

  ngOnInit() {
    switch (this.page) {
      case 'main':
        break;
      case 'task-description':
        break;
    }
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }

  async presentOwnerActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Task Actions',
      buttons: [{
        text: 'Cancel Task',
        icon: 'close',
        role: 'destructive',
        handler: () => {
          this.customerCancelTask();
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          console.log('Edit clicked');
        }
      }, {
        text: 'Close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Task Actions',
      buttons: [{
        text: 'Report Task',
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          console.log('Report clicked');
        }
      }, {
        text: 'Close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
    this.presentToast(freelancerAcceptedTask);
  }

  async freelancerWithdrawTask() {
    const freelancerWithdrawTask = await this.marketplaceService.freelancerWithdrawMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(freelancerWithdrawTask);
  }

  async customerCancelTask() {
    const cancelTask = await this.marketplaceService.customerCancelMainMarketplaceRequeset(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(cancelTask);
  }

  async doRefresh(event?) {
    setTimeout(() => {
      this.marketplaceService.getSingleMainMarketplaceRequest(this.taskID)
        .then((task: MainMarketplaceTask) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === 'Paid') ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;
          this.storage.get(StorageConsts.PROFILE)
            .then(prof => {
              this.userRole = prof.user.role;
              this.isOwner = prof.user_id === task.customer_id;
              this.isFreelancer = (this.userRole === Role.VERIFIED_FREELANCER)
                ? this.marketplaceService.checkIsTaskFreelancer(prof.user_id, this.mainMarketplaceTask)
                : false;
            });
        });
      if (event) {
        event.target.complete();
      }
    }, 1000);
  }
}
