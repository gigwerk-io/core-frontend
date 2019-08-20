import { Component, OnInit } from '@angular/core';
import {Searchable} from '../../utils/interfaces/searchable';
import {FriendsService} from '../../utils/services/friends.service';

@Component({
  selector: 'friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  friends: Searchable[];
  results: Searchable[];
  constructor(private friendService: FriendsService) { }

  ngOnInit() {
    this.friendService.getFriends().subscribe(res => {
      this.friends = res.friends;
    });
  }

  handleSearch(newValue: any) {
    this.friendService.searchUsers(newValue).subscribe(res => {
      this.friends = res.users;
    });
  }

}
