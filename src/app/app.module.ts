import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { WindowRef } from './helpers/window.handler';
import { SearchPipe } from './helpers/search.pipe';

import { ApiService, MessageService, UserService, UtilsService } from '../services/services';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';
import { EntriesComponent } from './entries/entries.component';
import { AboutComponent } from './about/about.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { MessageComponent } from '../services/message/message.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexComponent,
    EntriesComponent,
    AboutComponent,
    AddEntryComponent,
    MessageComponent,
    FooterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    MessageService,
    UserService,
    UtilsService,
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
