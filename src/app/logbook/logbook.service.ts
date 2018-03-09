import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LogbookService {

  constructor(private http: Http) { }

  getLogbookTotals(): Observable<any>{
    let url = "../../assets/logbook.json";

    return this.http.get(url)
      .map(data => {return data.json()})
  }
}
