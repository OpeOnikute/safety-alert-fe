import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  message = {status: null, text: null};

  constructor() {
  }

  checkNull (obj, except?) {
    const arr = Object.keys(obj);
    const nullValues = arr.filter(entry => {
      if (except && except.indexOf(entry) !== -1) {
        return false;
      }
      return obj[entry] == null;
    });
    return nullValues.length > 0;
  }
}
