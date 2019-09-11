import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileRouteResponse, User} from '../../utils/interfaces/user';
import {ProfileService} from '../../utils/services/profile.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {Storage} from '@ionic/storage';
import {StorageConsts} from '../../providers/constants';
import {AuthResponse} from '../../utils/interfaces/auth/auth-response';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [PhotoViewer]
})
export class ProfilePage implements OnInit {

  profile: ProfileRouteResponse;
  isOwner: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private storage: Storage,
              private profileService: ProfileService,
              private photoViewer: PhotoViewer,
              private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      const id: number = parseInt(data.get('id'), 10);
      this.profileService.getProfile(id)
        .subscribe((profile: ProfileRouteResponse) => {
          this.profile = profile;
          this.storage.get(StorageConsts.PROFILE)
            .then((prof: any) => {
              this.isOwner = (prof.user_id === this.profile.user.user_id);
            });
        });
    });
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }

  async presentOwnerActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Task Actions',
      buttons: [{
        text: 'Edit Profile',
        handler: () => {
          console.log('Edit clicked');
        }
      }, {
        text: 'Go to User Settings',
        icon: 'settings',
        handler: () => {
          console.log('Settings clicked');
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
        text: 'Report User',
        role: 'destructive',
        icon: 'flag',
        handler: () => {
          console.log('Report clicked');
        }
      }, {
        text: 'Block User',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Block clicked');
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
