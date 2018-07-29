import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LogUpdateService } from '../services/log-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private titleService: Title, log: LogUpdateService) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(`Safety Alert | ${newTitle}`);
  }
}
