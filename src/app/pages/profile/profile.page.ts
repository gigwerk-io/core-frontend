import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileRouteResponse} from '../../utils/interfaces/user';
import {ProfileService} from '../../utils/services/profile.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile: ProfileRouteResponse;

  constructor(private activatedRoute: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      const id: number = parseInt(data.get('id'), 10);
      this.profileService.getProfile(id)
        .subscribe((profile: ProfileRouteResponse) => {
          this.profile = profile;
          console.log(this.profile);
        });
    });
  }
}
