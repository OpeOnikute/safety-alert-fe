import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  message = {status: null, text: null};

  constructor() {
    this.clearMessages();
  }

  sendMessage (status, message) {
    this.message.status = status;
    this.message.text = message;
  }

  clearMessages () {
    this.message = {status: null, text: null};
  }
}
