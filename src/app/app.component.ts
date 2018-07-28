import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SwPush } from '@angular/service-worker';
import { MessageService } from '../services/message/message.service';
import { LogUpdateService } from '../services/log-update.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly VAPID_PUBLIC_KEY = 'BPzdlyQsqF_xFKTL28WM609TPJa_YYXFzdWuhFtt9h_wkQ-Bl-oOhO2ImRoqQQc9ypX3CT5lWBdd-uw4jv5sZ-E';

  constructor(private swPush: SwPush, private titleService: Title, private messaging: MessageService,
              log: LogUpdateService, private userService: UserService) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(`Safety Alert | ${newTitle}`);
  }

  public subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.userService.createPush(sub).then(data => {
          this.messaging.sendMessage('success', 'You Rock! You have been subscribed successfully.');
        }, err => {
          this.messaging.sendMessage('error', err || 'Technical issue: An error occurred. Please try again.');
        });
        console.log(sub);
      })
      .catch(err => console.error('Could not subscribe to notifications', err));

  }
}
