import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Igradebook, ILogbook} from './ilogbook';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LogbookService {
  private url:string = "../../assets/logbook.json";

  constructor(private http: Http) { }

  getLogbookTotals(): Observable<any>{
    return this.http.get(this.url)
      .map(data => {
        let totals = [
          {"Grade":2,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":3,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":4,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":5,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":6,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":7,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":8,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":9,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":10,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":11,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
          ,{"Grade":12,"count":{"Flash":0, "Second Go":0, "Redpoint":0}}
        ]
        data.json().Logbook.forEach(entry=>{
          totals[entry.Grade-2].count[entry.Tries] +=1;
        })
        return totals;
      })
  }

  getLogbook(): Observable<ILogbook[]>{
    return this.http.get(this.url).map(data => {return data.json().Logbook})
  }
}
