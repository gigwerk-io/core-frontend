import {Component, Input, OnInit} from '@angular/core';
import {
  FreelancerAcceptMainMarketplaceTaskRouteResponse,
  MainMarketplaceTask
} from '../../interfaces/main-marketplace/main-marketplace-task';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ChatService} from '../../services/chat.service';
import {Storage} from '@ionic/storage';
import {StorageConsts} from '../../../providers/constants';
import {Profile} from '../../interfaces/user';
import {MarketplaceService} from '../../services/marketplace.service';
import {ProfileService} from '../../services/profile.service';

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

  // TODO: define types of Roles there's already storage constants for this

  constructor(private photoViewer: PhotoViewer,
              private loadingCtrl: LoadingController,
              private router: Router,
              private marketplaceService: MarketplaceService,
              private chatService: ChatService,
              private toastController: ToastController,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get(StorageConsts.PROFILE)
      .then((profile: Profile) => {
        this.userID = profile.user_id;
        this.userRole = profile.user.role;
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

  async freelancerAcceptTask() {
    const freelancerAcceptingRequest = await this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true
    });

    await freelancerAcceptingRequest.present();
    const freelancerAcceptedTask = await this.marketplaceService.freelancerAcceptMainMarketplaceRequest(this.mainMarketplaceTask.id)
      .then((res: string) => res)
      .catch((err: any) => err.error.message);

    await this.toastController.create({
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
}
