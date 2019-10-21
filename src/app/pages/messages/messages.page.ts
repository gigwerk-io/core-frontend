import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../utils/services/chat.service';
import {Room} from '../../utils/interfaces/chat/room';
import {StorageKeys} from '../../providers/constants';
import {Storage} from '@ionic/storage';
import {PusherServiceProvider} from '../../providers/pusher.service';
import {ActionSheetController, IonContent} from '@ionic/angular';


@Component({
  selector: 'messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content: IonContent;
  room: Room;
  user_id: Number;
  messages: any; // TODO create types
  toUser: string;
  uuid: string;
  pendingMessage = '';
  sending = false;
  constructor(private activatedRoute: ActivatedRoute,
              private chatService: ChatService,
              private storage: Storage,
              private pusher: PusherServiceProvider,
              private actionSheetCtrl: ActionSheetController,
              private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.uuid = data.get('uuid');

      // Initial Messages
      this.getMessages();
    });
    this.storage.get(StorageKeys.PROFILE)
      .then(profile => {
        this.user_id = profile.user_id;
      });
  }

  public getUserProfileImage() {
    const members = this.room.members;
    for (const member of members) {
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

  public goToUserProfile() {
    const members = this.room.members;
    for (const member of members) {
      if (member.id !== this.user_id) {
        this.router.navigate(['/app/profile', member.id]);
      }
    }
  }

  ionViewDidLoad() {
    this.scrollToBottomOnInit();
  }

  public getMessages() {
    this.chatService.getChatRoom(this.uuid).subscribe(res => {
      this.room = res;
      this.messages = this.room.messages;
      this.toUser = this.getToUser();
      console.log(this.toUser);
      const channel = this.pusher.init(this.uuid);
      channel.bind('new-message', data => {
        this.messages.push(data.message);
        this.scrollToBottomOnInit();
        console.log(data);
        this.sending = false;
      });
    });
  }

  public sendMessage() {
    this.sending = true;
    this.chatService.sendMessage(this.uuid, this.pendingMessage);
    this.pendingMessage = '';
  }

  scrollToBottomOnInit() {
    this.content.scrollToBottom(300).catch(err => { console.log(err); });
  }

  onFocus() {
    this.scrollToBottomOnInit();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Task Actions',
      buttons: [{
        text: 'View Profile',
        icon: 'person',
        handler: () => {
          this.goToUserProfile();
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

  doRefresh(event) {
    this.getMessages();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
