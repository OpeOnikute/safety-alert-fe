import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';
import { EntriesComponent } from './entries/entries.component';
import { AboutComponent } from './about/about.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

const routes: Routes = [
  { path: '', component: MainComponent,
    children: [
      { path: 'index', component: IndexComponent },
      { path: 'entries', component: EntriesComponent },
      { path: 'entries/add', component: AddEntryComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: 'index' }
    ]},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
