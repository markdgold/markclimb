import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Globals } from '../../../globals';
import { Ivimeopost } from './ivimeopost';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

declare const $ :any;
@Injectable()
export class VimeoService {
  private allVidUrl: string = 'https://api.vimeo.com/users/2724917/videos';
  private token: string;

  constructor(private http: Http, private globals: Globals) { 
    this.token = globals.token
  }

  getVimeoLinks(): Observable<Ivimeopost[]> {
    console.log('getting videos')
    let headers = new Headers();
    headers.append('Authorization', this.token);
    let opts = new RequestOptions();
    opts.headers = headers;
    return this.http.get(this.allVidUrl, opts)
      .map(data => {
        console.log(data.json().data)
        return data.json().data.map(video => {
          let newObj = {
            'title': video.name,
            'id': video.link.slice(18),
          };
          console.log(newObj);
          return newObj
        });
      })
  }
}