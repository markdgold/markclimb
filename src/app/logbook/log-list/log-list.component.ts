import { Component, OnInit, Input } from '@angular/core';

import { LogbookService } from '../logbook.service';
import {FormatService} from '../../shared/format.service';


@Component({
  selector: 'log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  logBook: Array<{}> = [];
  currentSort: string = 'Date';
  currentSortOrder: string = 'desc';
  filter = {
    by: '',
    value: '',
  };

  constructor(private logbookService: LogbookService, private formatService: FormatService) { }

  sortBy(param){
    let sortOrder = (this.currentSort === param) ? ((this.currentSortOrder === 'desc')? 'asc': 'desc') : 'desc';
    this.formatService.sortTable(this.logBook, param, sortOrder).subscribe(data => {
      this.currentSort = param;
      this.currentSortOrder = sortOrder;
    })
  }

  filterTable(type, value){
    this.filter.by = type;
    this.filter.value = value;
    console.log('filtering')
  }

  ngOnInit() {
    this.logbookService.getLogbook().subscribe(data => {
      this.formatService.sortTable(data, this.currentSort, this.currentSortOrder).subscribe(data =>{
        this.logBook = data;
      })
    });
  }

}
