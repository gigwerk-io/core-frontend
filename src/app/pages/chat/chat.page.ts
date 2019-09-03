import { Component, OnInit } from '@angular/core';
import {Room} from '../../utils/interfaces/chat/room';
import {ChatService} from '../../utils/services/chat.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  rooms: Room[];
  constructor(private roomService: ChatService) { }

  ngOnInit() {
    this.roomService.getChatRooms().subscribe(res => {
      this.rooms = res.rooms;
      console.log(this.rooms);
    });
  }

}
