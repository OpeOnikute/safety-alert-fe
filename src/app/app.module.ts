import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';
import { EntriesComponent } from './entries/entries.component';
import { AboutComponent } from './about/about.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    IndexComponent,
    EntriesComponent,
    AboutComponent,
    AddEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
