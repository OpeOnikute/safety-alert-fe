import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SwPush } from '@angular/service-worker';
import { MessageService } from '../../services/message/message.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = 'BPzdlyQsqF_xFKTL28WM609TPJa_YYXFzdWuhFtt9h_wkQ-Bl-oOhO2ImRoqQQc9ypX3CT5lWBdd-uw4jv5sZ-E';

  constructor(private app: AppComponent, private swPush: SwPush, private messaging: MessageService,
          private userService: UserService) {}

  ngOnInit() {
    this.app.setTitle('About');
  }

  subscribeForPush() {
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
      .catch(err => {
        this.messaging.sendMessage('error', err || 'Technical issue: An error occurred. Please try again.');
        console.error('Could not subscribe to notifications', err);
      });
  }
}
