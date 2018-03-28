import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { SharedModule } from '../shared/shared.module';

import { LogbookComponent } from './logbook.component';
import { LogListComponent } from './log-list/log-list.component';

import { LogbookService } from './logbook.service';

import { VermPipe } from './verm.pipe';
import { FilterTicksPipe } from './filter-ticks.pipe';
import { AddClimbComponent } from './add-climb/add-climb.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCZ6srunC4Xu9NeOVf4sdUdGIoggLQabek",
  authDomain: "mark-climb.firebaseapp.com",
  databaseURL: "https://mark-climb.firebaseio.com",
  projectId: "mark-climb",
  storageBucket: "mark-climb.appspot.com",
  messagingSenderId: "512982081956",
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: LogbookComponent},
    ]),
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LogbookComponent, LogListComponent, VermPipe, FilterTicksPipe, AddClimbComponent],
  providers: [LogbookService]
})
export class LogbookModule { }
