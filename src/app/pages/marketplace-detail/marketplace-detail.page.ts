import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from '@ionic/angular';
import {MainMarketplaceTask} from '../../utils/interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {ActivatedRoute} from '@angular/router';
import {MarketplaceService} from '../../utils/services/marketplace.service';
import {Storage} from '@ionic/storage';
import {StorageConsts} from '../../providers/constants';

@Component({
  selector: 'marketplace-detail',
  templateUrl: './marketplace-detail.page.html',
  styleUrls: ['./marketplace-detail.page.scss'],
  providers: [PhotoViewer]
})
export class MarketplaceDetailPage implements OnInit {

  mainMarketplaceTask: MainMarketplaceTask;
  page = 'main';
  taskStatusDisplay: string;
  isOwner: boolean;

  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private photoViewer: PhotoViewer,
              private activatedRoute: ActivatedRoute,
              private marketplaceService: MarketplaceService,
              private actionSheetCtrl: ActionSheetController) {
    this.activatedRoute.paramMap.subscribe(data => {
      const id: number = parseInt(data.get('id'), 10);
      this.marketplaceService.getSingleMarketplaceRequest(id)
        .subscribe((task: MainMarketplaceTask) => {
          this.mainMarketplaceTask = task;
          this.taskStatusDisplay = (this.mainMarketplaceTask.status === 'Paid') ? 'Freelancer En-Route' : this.mainMarketplaceTask.status;

          this.storage.get(StorageConsts.PROFILE)
            .then(prof => {
              this.isOwner = prof.user_id === task.customer_id;
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
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit',
        handler: () => {
          console.log('Edit clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
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
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
