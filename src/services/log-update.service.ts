import { SwUpdate } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { MessageService } from './message/message.service';

@Injectable()
export class LogUpdateService {

  constructor(updates: SwUpdate, private messaging: MessageService) {
    updates.available.subscribe(event => {
      if (event.current !== event.available) {
        this.messaging.sendMessage('info', 'Please refresh your page to update.');
      }
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  }
}
