import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.setTitle('About');
  }

  subscribe() {
    this.app.subscribeToNotifications();
  }
}
