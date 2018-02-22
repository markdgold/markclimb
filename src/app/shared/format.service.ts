import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormatService {

  constructor() { }

  private isMobileFlag = new Subject<any>();
   testFlag: boolean = true;

  updateFlag(flag: boolean){
    this.isMobileFlag.next(flag)
  }

  getFlag(from): Observable<any>{
    return this.isMobileFlag.asObservable();
  }

}
