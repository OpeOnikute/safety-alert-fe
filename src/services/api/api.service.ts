import 'rxjs/add/operator/map';

import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

interface Response {
  status: string;
  message: string;
  data: string;
}

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiService {
  url = isDevMode() ? 'http://localhost:3000' : 'https://safety-alert-api.herokuapp.com';
  headers: any;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
  }

  get(endpoint: string, params?: any) {
    const requestOptions = {
      params: new HttpParams()
    };

    // Support easy query params for GET requests
    if (params) {
      for (let k in params) {
        requestOptions.params.set(k, params[k]);
      }
      // // Set the search field if we have params and don't already have
      // // a search field set in options.
      // requestOptions.search = !requestOptions.search && p || requestOptions.search;
    }

    return this.http.get<Response>(this.url + '/' + endpoint, requestOptions);
  }

  getX(endpoint: string, params?: any) {
    const requestOptions = {
      params: new HttpParams()
    };

    // Support easy query params for GET requests
    if (params) {
      for (let k in params) {
        requestOptions.params.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      // options.search = !options.search && p || options.search;
    }

    return this.http.get<Response>(endpoint, requestOptions);
  }

  post(endpoint: string, body: any) {
    const endpointURL = this.url + '/' + endpoint;
    return this.http.post<Response>(endpointURL, body, { headers: this.headers });
  }

  put(endpoint: string, body: any) {
    return this.http.put<Response>(this.url + '/' + endpoint, body, { headers: this.headers });
  }

  delete(endpoint: string) {
    return this.http.delete<Response>(this.url + '/' + endpoint, { headers: this.headers });
  }

  patch(endpoint: string, body: any) {
    return this.http.put<Response>(this.url + '/' + endpoint, body, { headers: this.headers});
  }
}
