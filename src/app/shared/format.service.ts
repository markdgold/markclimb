import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';

@Injectable()
export class FormatService {

  constructor() { }

  private isMobileFlag = new Subject<any>();

  updateFlag(flag: boolean){
    this.isMobileFlag.next(flag)
  }

  getFlag(from): Observable<any>{
    return this.isMobileFlag.asObservable();
  }

  sortTable(data, column, direction): Observable<[{}]>{
    console.log(data);
    let sorted = data.sort((a,b)=>{
      let directionInt = (direction === "desc")? -1 : 1;
      
      if (a[column] > b[column]){
        return directionInt
      } else if (a[column] < b[column]){
        return -directionInt
      } else {
        return 0;
      }
    })
    return Observable.of(sorted);
  }

}
