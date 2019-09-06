import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../utils/services/chat.service';
import {Room} from '../../utils/interfaces/chat/room';
import {StorageConsts} from '../../providers/constants';
import {Storage} from '@ionic/storage';
import {PusherServiceProvider} from '../../providers/pusher.service';
import {IonContent} from '@ionic/angular';


@Component({
  selector: 'messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  room: Room;
  user_id: Number;
  messages: any; // TODO create types
  toUser: string;
  uuid: string;
  pendingMessage = '';
  buttonDisabled = false;
  constructor(private activatedRoute: ActivatedRoute,
              private chatService: ChatService,
              private storage: Storage,
              private pusher: PusherServiceProvider
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.uuid = data.get('uuid');

      // Initial Messages
      this.chatService.getChatRoom(this.uuid).subscribe(res => {
        this.room = res;
        this.messages = this.room.messages;
        this.toUser = this.getToUser();
        const channel = this.pusher.init(this.uuid);
        channel.bind('new-message', data => {
          this.messages.push(data.message);
          this.scrollToBottomOnInit();
          console.log(data);
        });
      });
    });
    this.storage.get(StorageConsts.PROFILE)
      .then(profile => {
        this.user_id = profile.user_id;
      });
  }
  public getUserProfileImage() {
    const members = this.room.members;
    // tslint:disable-next-line
    for(let member of members) {
      if (member.id !== this.user_id) {
        return member.profile.image;
      }
    }
  }

  public getToUser() {
    const members = this.room.members;
    // tslint:disable-next-line
    for(let member of members) {
      if (member.id !== this.user_id) {
        return member.first_name + ' ' + member.last_name;
      }
    }
  }

  ionViewDidLoad() {
    this.scrollToBottomOnInit();
  }

  public sendMessage() {
    this.buttonDisabled = true;
    this.chatService.sendMessage(this.uuid, this.pendingMessage).subscribe(res => {});
    this.pendingMessage = '';
    this.buttonDisabled = false;
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(300).catch(err => { console.log(err); });
  }

  onFocus() {
    this.scrollToBottomOnInit();
  }

}
