import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {Storage} from '@ionic/storage';
import {Role, StorageKeys, TaskActions, TaskStatus} from '../../providers/constants';
import {ChatService} from '../../utils/services/chat.service';
import {TASK_CATEGORIES} from '../../utils/mocks/mock-categories.mock';
import {Events} from '@ionic/angular';
import {CompleteTaskPage} from '../complete-task/complete-task.page';
import {LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

@Component({
  selector: 'marketplace-detail',
  templateUrl: './marketplace-detail.page.html',
  styleUrls: ['./marketplace-detail.page.scss'],
  providers: [PhotoViewer, LaunchNavigator]
})
export class MarketplaceDetailPage implements OnInit, OnDestroy {

  taskID: number;
  mainMarketplaceTask: MainMarketplaceTask;
  page = 'main';
  taskStatusDisplay: string;
  isOwner: boolean;
  isFreelancer: boolean;
  userRole: string;
  Categories = TASK_CATEGORIES;
  TaskStatus = TaskStatus;

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
              private chatService: ChatService,
              private events: Events,
              private launchNavigator: LaunchNavigator) {
    this.events.subscribe('task-action', (action) => {
      if (action === TaskActions.FREELANCER_COMPLETE_TASK ||
          action === TaskActions.CUSTOMER_COMPLETE_TASK ||
          action === TaskActions.CUSTOMER_UPDATE_TASK) {
        this.doRefresh();
      }
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.taskID = parseInt(data.get('id'), 10);
      this.marketplaceService.getSingleMainMarketplaceRequest(this.taskID)
        .then((task: MainMarketplaceTask) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === TaskStatus.PAID)
            ? 'Freelancer En-Route'
            : this.mainMarketplaceTask.status;
          this.storage.get(StorageKeys.PROFILE)
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

  ngOnDestroy(): void {
    this.events.unsubscribe('task-action');
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
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
      this.marketplaceService.getSingleMainMarketplaceRequest(this.mainMarketplaceTask.id)
        .then((task) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === TaskStatus.PAID) ?
            'Freelancer En-Route'
            : this.mainMarketplaceTask.status;
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
      .then(() => this.events.publish('task-action', TaskActions.FREELANCER_ACCEPT_TASK, this.mainMarketplaceTask.id));
  }

  async freelancerWithdrawTask() {
    const freelancerWithdrawTask = await this.marketplaceService.freelancerWithdrawMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(freelancerWithdrawTask)
      .then(() => this.events.publish('task-action', TaskActions.FREELANCER_WITHDRAW_TASK, this.mainMarketplaceTask.id));
  }

  async freelancerArriveTask() {
    const freelancerArriveTask = await this.marketplaceService.freelancerArrivedAtTaskSite(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(freelancerArriveTask)
      .then(() => this.events.publish('task-action', TaskActions.FREELANCER_ARRIVE_TASK, this.mainMarketplaceTask.id));
  }

  async completeTask(isFreelancer: boolean) {
    const modal = await this.modalCtrl.create({
      component: CompleteTaskPage,
      componentProps: {'taskID': this.mainMarketplaceTask.id, 'isFreelancer': isFreelancer},
    });

    modal.present();
  }

  async customerCancelTask() {
    const cancelTask = await this.marketplaceService.customerCancelMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);
    this.presentToast(cancelTask)
      .then(() => {
        this.events.publish('task-action', TaskActions.CUSTOMER_CANCEL_TASK, this.mainMarketplaceTask.id);
        this.navCtrl.back();
      });
  }

  async customerApproveFreelancer(freelancerID: number) {
    const customerApproveFreelancer = await this.marketplaceService.customerApproveFreelancer(this.mainMarketplaceTask.id, freelancerID)
      .then((res: string) => {
        console.log('success -> ' + res);
        return res;
      })
      .catch((err: any) => {
        console.log('fail -> ' + JSON.stringify(err.error));
        return err.error.message;
      });
    this.presentToast(customerApproveFreelancer)
      .then(() => this.events.publish('task-action', TaskActions.FREELANCER_ACCEPT_TASK, this.mainMarketplaceTask.id));
  }

  async customerRejectFreelancer(freelancerID: number) {
    const customerDenyFreelancer = await this.marketplaceService.customerDenyFreelancer(this.mainMarketplaceTask.id, freelancerID)
      .then((res: string) => {
        console.log('success -> ' + res);
        return res;
      })
      .catch((err: any) => {
        console.log('fail -> ' + err);
        return err.error.message;
      });
    this.presentToast(customerDenyFreelancer)
      .then(() => this.events.publish('task-action', TaskActions.FREELANCER_ACCEPT_TASK, this.mainMarketplaceTask.id));
  }

  async doRefresh(event?) {
    setTimeout(() => {
      this.marketplaceService.getSingleMainMarketplaceRequest(this.taskID)
        .then((task: MainMarketplaceTask) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === 'Paid') ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;
          this.storage.get(StorageKeys.PROFILE)
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

  editTaskRequest(task: MainMarketplaceTask) {
    this.navCtrl.navigateForward('/app/edit-task')
      .then(() => this.events.publish('task-edit', task));
  }

  openLocation() {
   const locationAddress = this.mainMarketplaceTask.locations[0].street_address + ', '
      + this.mainMarketplaceTask.locations[0].city + ', '
      + this.mainMarketplaceTask.locations[0].state + ', '
      + this.mainMarketplaceTask.locations[0].zip;

    const options: LaunchNavigatorOptions = {};

    this.launchNavigator.navigate(locationAddress, options)
      .then(success => console.log('Launched navigator'))
      .catch(error => console.log('Error launching navigator', error));
  }
}
