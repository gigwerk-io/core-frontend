import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileRouteResponse} from '../../utils/interfaces/user';
import {ProfileService} from '../../utils/services/profile.service';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [PhotoViewer]
})
export class ProfilePage implements OnInit {

  profile: ProfileRouteResponse;

  constructor(private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      const id: number = parseInt(data.get('id'), 10);
      this.profileService.getProfile(id)
        .subscribe((profile: ProfileRouteResponse) => this.profile = profile);
    });
  }

  private viewAttachedPhoto(url: string, photoTitle?: string): void {
    this.photoViewer.show(url, (photoTitle) ? photoTitle : '');
  }
}
