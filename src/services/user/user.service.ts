import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable()
export class UserService {

  URLBase = '';

  constructor(public api: ApiService) { }

  createPush (data) {
    return this._processPost('push', data);
  }

  createEntry (data) {
    return this._processPost('entry', data);
  }

  updateEntry (data) {
    return this._processPut(`entry`, data);
  }

  getEntries () {
    return this._processGet('entry');
  }

  getEntry (id) {
    return this._processGet(`entry/${id}`);
  }

  _processPost(endpoint, data, options?) {

    let base = this.URLBase;

    if (options && (options.type === 'user')) {
      base = 'users/';
    }

    const seq = this.api.post(base + endpoint, data).share();

    return new Promise((resolve, reject) => {
      seq
        .subscribe(res => {
          this._processResult(res, resolve, reject);
          }, err => {
          this._processResult(err.error, resolve, reject);
        });
    });
  }

  _processPut(endpoint, data, options?) {

    let base = this.URLBase;

    if (options && (options.type === 'user')) {
      base = 'users/';
    }

    const seq = this.api.put(base + endpoint, data).share();

    return new Promise((resolve, reject) => {
      seq
        .subscribe(res => {
          this._processResult(res, resolve, reject);
        }, err => {
          this._processResult(err.error, resolve, reject);
        });
    });
  }

  _processGet(endpoint) {
    const seq = this.api.get(this.URLBase + endpoint).share();

    return new Promise((resolve, reject) => {
      seq
        .subscribe(res => {
          this._processResult(res, resolve, reject);
        }, error => {
          this._processResult(error.error, resolve, reject);
        });
    });
  }

  _processResult(res, resolve, reject) {
    if (typeof res === 'string') {
      try {
        res = JSON.parse(res);
      } catch (e) {
        reject('Technical issue: An error occurred. Please try again.');
        return false;
      }
    }
    if (res.status === 'success') {
      resolve(res.data);
    } else {
      reject(res.message || 'Technical issue: An error occurred. Please try again.');
    }
  }
}
