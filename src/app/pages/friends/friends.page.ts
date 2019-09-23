import { Component, OnInit } from '@angular/core';
import {Searchable} from '../../utils/interfaces/searchable';
import {FriendsService} from '../../utils/services/friends.service';
import {Router} from '@angular/router';
import {ChatService} from '../../utils/services/chat.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  users: Searchable[];
  title = 'Friends';
  btnClass: string;
  secondButton = false;
  clickType = 'friends';
  constructor(private friendService: FriendsService,
              private chatService: ChatService,
              private router: Router,
              public toastController: ToastController
  ) { }

  ngOnInit() {

  }

  handleSearch(query) {
    this.title = 'Results';
    this.btnClass = 'arrow-forward';
    this.secondButton = false;
    this.clickType = 'search';
    this.friendService.searchUsers(query).subscribe(res => {
      this.users = res;
    });
  }

  segmentChanged(event) {
    this.clickType = event.target.value;
    switch (event.target.value) {
      case 'recommended':
        this.showRecommendedFriends();
        break;
      case 'friends':
        this.showMyFriends();
        break;
      case 'new':
        this.showMyFriendRequests();
        break;
      default:
        this.showMyFriends();
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2500,
      color: 'dark',
      showCloseButton: true
    }).then(toast => {
      toast.present();
    });
  }

  showRecommendedFriends() {
    this.title = 'Recommended';
    this.btnClass = 'person-add';
    this.secondButton = false;
    this.friendService.getRecommendedFriends().subscribe(res => {
      this.users = res;
    });
  }

  showMyFriends() {
    this.title = 'Friends';
    this.btnClass = 'chatbubbles';
    this.secondButton = false;
    this.friendService.getMyFriends().subscribe(res => {
      this.users = res;
    });
  }

  showMyFriendRequests() {
    this.title = 'Requests';
    this.btnClass = 'add-circle';
    this.secondButton = true;
    this.friendService.getFriendRequests().subscribe(res => {
      this.users = res;
    });
  }

  goToUserProfile(id) {
    this.router.navigate(['/app/profile', id]);
  }

  startChat(username) {
    this.chatService.startChat(username).subscribe(res => {
      this.router.navigate(['/app/room', res.id]);
    });
  }

  sendFriendRequest(id) {
    this.friendService.sendFriendRequest(id).subscribe(res => {
      this.presentToast(res);
    }, error => {
      console.log(error);
    });
  }

  acceptFriendRequest(id) {
    this.friendService.acceptFriendRequest(id).subscribe(res => {
      this.presentToast(res);
    });
  }

  rejectFriendRequest(id) {
    this.friendService.rejectFriendRequest(id).subscribe(res => {
      this.presentToast(res);
    });
  }

  handleClick(user) {
    switch (this.clickType) {
      case 'friends':
        this.startChat(user.username);
        break;
      case 'recommended':
        this.sendFriendRequest(user.id);
        break;
      case 'new':
        this.acceptFriendRequest(user.id);
        break;
      case 'search':
        this.goToUserProfile(user.id);
        break;
      default:
        this.startChat(user.username);
    }
  }
}
