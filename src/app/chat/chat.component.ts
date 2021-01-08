import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {ChatService} from "../service/chat.service";
import actionCable from 'actioncable'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private apiService: ApiService, private chatService: ChatService) { }

  selectedRoom: any = 1;
  chat = { room_message: { room_id: this.selectedRoom, message: '' } }
  rooms = [{ id: 1, name: 'room1' },
           { id: 2, name: 'room2' },
           { id: 3, name: 'room3' }];
  chatContainer;

  ngOnInit(): void {
  }

  submit() {
    this.apiService.chat(this.chat)
      .subscribe(data => {
        this.chat.room_message.message = null
    })
  }

  onSelect(): void {
    this.chat.room_message.room_id = this.selectedRoom;
    // this.chatService.subscribe(this.selectedRoom)
    this.subscribe(this.selectedRoom)
  }

  private chatCabel = actionCable.createConsumer('ws://localhost:3000/cable')

  subscribe(room) {
    this.chatCabel.subscriptions.create(
      {
        channel: 'RoomChannel',
        room: room
      }, {
        received: (data: any) => {

          this.appendMsg(data.user_id,  data.message)
        }
      });
  }

  appendMsg(user, msg) {
    let container = document.getElementById('chatContainer')
    // let content = document.createElement('div');
    // content = '<span> '+msg+'</span>';
    // container.appendChild(content)
    // this.chatContainer = '<span>user: '+user+'</span><span> '+msg+'</span>'
    // this.chatContainer.appendChild('<span>user: '+user+'</span><span> '+msg+'</span>')
    let content = document.createElement('div')
    content.innerHTML = 'user: ' + user + ' ' + msg
    container.appendChild(content);
  }
}
