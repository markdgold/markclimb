import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'

import {IGradeCount, IClimb} from './ilogbook';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const firebaseConfig = {

}

@Injectable()
export class LogbookService {
  constructor(private http: Http, private afs: AngularFirestore) {  }

  getLogbookTotals(): Observable<IGradeCount[]>{
    let climbsCol: AngularFirestoreCollection<IClimb>= this.afs.collection('climbs');
    let climbs: Observable<IClimb[]> = climbsCol.valueChanges();
    return climbs
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
        data.forEach(entry=>{
          totals[entry.Grade-2].count[entry.Tries] +=1;
        })
        return totals;
    })
  }

  getLogbook(): Observable<IClimb[]>{
    let climbsCol: AngularFirestoreCollection<IClimb>= this.afs.collection('climbs');
    let climbs: any = climbsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IClimb;
            data.Id = a.payload.doc.id;
          return data;
        })
      })
    return climbs
  }

  addClimb(name, grade, location, date, tries, comment) {
    this.afs.collection('climbs').add({'Name': name, 'Grade': grade, 'Location': location, 'Date': date, 'Tries': tries, 'Comment': comment});
  }
  //TODO add edit climb
  //TODO add delete climb
}
