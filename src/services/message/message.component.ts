import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css', '../../assets/css/bootstrap.min.css']
})
export class MessageComponent implements OnInit {

  constructor(public messaging: MessageService) { }

  ngOnInit() {
    this.messaging.clearMessages();
  }
}
