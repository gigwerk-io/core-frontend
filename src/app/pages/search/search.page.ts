import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar, ModalController} from '@ionic/angular';
import {FriendsService} from '../../utils/services/friends.service';
import {Router} from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  users;
  query;
  // @ts-ignore
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;

  constructor(private modalCtrl: ModalController, private friendService: FriendsService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => this.searchBar.setFocus(), 350);
  }

  async closeSearchPage() {
    await this.modalCtrl.dismiss();
  }

  handleSearch() {
    // console.log(this.query);
    this.friendService.searchUsers(this.query).subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

  goToUserProfile(id) {
    this.closeSearchPage();
    this.router.navigate(['/app/profile', id]);
  }
}
