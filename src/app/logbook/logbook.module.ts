import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogbookComponent } from './logbook.component';
import { SharedModule } from '../shared/shared.module';
import { LogbookService } from './logbook.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: LogbookComponent}]),
    SharedModule,
  ],
  declarations: [LogbookComponent],
  providers: [LogbookService]
})
export class LogbookModule { }
