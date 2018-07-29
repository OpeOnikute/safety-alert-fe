import { SwUpdate } from '@angular/service-worker';
import { Injectable } from '@angular/core';
import { MessageService } from './message/message.service';

@Injectable()
export class LogUpdateService {

  constructor(private updates: SwUpdate, private messaging: MessageService) {
    this.updates.available.subscribe(event => {
      if (event.current !== event.available) {
        this.messaging.sendMessage('info', 'A new update is available. Please refresh or re-open the app.');
      }
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    // this.updates.activated.subscribe(event => {
    //   console.log('old version was', event.previous);
    //   console.log('new version is', event.current);
    // });
  }
}
