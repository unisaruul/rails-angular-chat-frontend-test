import { Injectable } from '@angular/core';
import actionCable from 'actioncable'

@Injectable()
export class ChatService {

  constructor() { }

  private chatCabel = actionCable.createConsumer('ws://localhost:3000/cable')

  subscribe(room) {
    this.chatCabel.subscriptions.create(
      {
        channel: 'RoomChannel',
        room: room
      }, {
        received: (data: any) => {
          alert(JSON.stringify(data))
          // this.chatComponent.broadcasting = JSON.stringify(data)
        }
      });
  }
}
