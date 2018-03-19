import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LogbookComponent } from './logbook.component';
import { VermPipe } from './verm.pipe';
import { LogbookService } from './logbook.service';
import { SharedModule } from '../shared/shared.module';

import { LogListComponent } from './log-list/log-list.component';
import { FilterTicksPipe } from './filter-ticks.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: LogbookComponent}]),
    SharedModule
  ],
  declarations: [LogbookComponent, LogListComponent, VermPipe, FilterTicksPipe],
  providers: [LogbookService]
})
export class LogbookModule { }
