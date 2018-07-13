import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  entries = null;
  loading = false;

  constructor(private app: AppComponent, private userService: UserService, private messaging: MessageService) {}

  ngOnInit() {
    this.app.setTitle('Entries');
    this.getEntries();
  }

  getEntries () {

    this.loading = true;

    this.userService.getEntries().then(data => {
      this.entries = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.messaging.sendMessage('error', err || 'Technical issue: An error occurred. Please try again.');
    });
  }
}
