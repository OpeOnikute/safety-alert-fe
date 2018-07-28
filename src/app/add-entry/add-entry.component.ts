import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../../services/user/user.service';
import { MessageService } from '../../services/message/message.service';
import { UtilsService } from '../../services/helpers/utils.service';
import { WindowRef } from '../helpers/window.handler';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css']
})
export class AddEntryComponent implements OnInit {

  entry = {title: null, description: null, location: null, content: null, contentType: null};

  loadingAdd: boolean;
  loading: boolean;

  constructor(private app: AppComponent, private winRef: WindowRef, private utils: UtilsService,
              private userService: UserService, private messaging: MessageService) {

  }

  ngOnInit() {
    this.app.setTitle('Add Entry');

    if (!this.winRef.nativeWindow.cloudinary) {
      this.messaging.sendMessage('error', 'Sorry, we could not load the content upload service. Please refresh the page.');
    }
  }

  uploadContent() {
    const component = this;

    if (component.utils.checkNull(this.entry, ['content', 'contentType'])) {
      return component.messaging.sendMessage('error', 'Please complete the form before you try to upload.');
    }

    if (!component.winRef.nativeWindow.cloudinary) {
      return component.messaging.sendMessage('error', 'Sorry, we could not load the content upload service. Please refresh the page.');
    }

    component.loading = true;

    component.winRef.nativeWindow.cloudinary.openUploadWidget(
      { cloud_name: 'dwyourwdl', upload_preset: 'safety_content', folder: 'safety_content', multiple: false},
      function (error, result) {
        component.loading = false;
        if (error) {
          return component.messaging.sendMessage('error',
            error || 'An error occurred and your content could not be uploaded. Please try again.');
        }
        const uploaded = result[0];
        component.entry.contentType = uploaded['resource_type'];
        component.entry.content = uploaded['secure_url'];
        component.addEntry();
      });
  }

  addEntry ( ) {

    if (this.utils.checkNull(this.entry)) {
      return this.messaging.sendMessage('error', 'Please complete the form before you try to upload.');
    }

    this.loadingAdd = true;
    this.userService.createEntry(this.entry).then(data => {
      this.loadingAdd = false;
      this.entry={title: null, description: null, location: null, content: null, contentType: null};
      this.messaging.sendMessage('success', 'You Rock! Your content has been uploaded successfully.');
    }, err => {
      this.loadingAdd = false;
      this.messaging.sendMessage('error', err || 'Technical issue: An error occurred. Please try again.');
    });
  }
}
