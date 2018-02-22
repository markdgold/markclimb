import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Globals } from '../../../globals';

import { Iinstapost } from './iinstapost';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InstagramService {
  private userId: string = '364399493';
  private instaToken: string;

  constructor(private http: Http, private globals: Globals) { 
    this.instaToken = globals.instaToken
  }
  getUserInfo(): Observable<any> {
    let userInfoUrl = 'https://api.instagram.com/v1/users/'+this.userId+'/?access_token='+this.instaToken;
    return this.http.get(userInfoUrl)
      .map(data => {return data.json().data})
  }
  getUserMedia(): Observable<Iinstapost[]> {
    let userMediaUrl = 'https://api.instagram.com/v1/users/'+this.userId+'/media/recent/?access_token='+this.instaToken;
    return this.http.get(userMediaUrl)
      .map(data => {return data.json().data})
  }
  getImageEmbed(link: string): Observable<any> {
    let embedUrl = 'https://api.instagram.com/oembed/?url='+link;
    return this.http.get(embedUrl)
      .map(data => {return data.json().html})
  }
}
