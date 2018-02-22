import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormatService {

  constructor() { }

  private isMobileFlag = new Subject<any>();
   testFlag: boolean = true;

  // set isMobile(flag: boolean) {
  //   this.isMobileFlag = flag;
  //   console.log('ismobile set to', this.isMobileFlag)
  // }

  // get isMobile(){
  //   console.log('is mobile', this.isMobileFlag)
  //   return this.isMobileFlag;
  // }

  // isMobileFlag$ = this.isMobileFlag.asObservable();

  updateFlag(flag: boolean){
    console.log('setting ismobile to ', flag)
    this.isMobileFlag.next(flag)
  }

  getFlag(from): Observable<any>{
    console.log('getting flag', from)
    return this.isMobileFlag.asObservable();
  }

}
