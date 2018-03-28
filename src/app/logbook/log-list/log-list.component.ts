import { Component, OnInit, Input } from '@angular/core';
import { trigger, style, state, animate, stagger, transition, keyframes, query } from '@angular/animations';

import { LogbookService } from '../logbook.service';
import {FormatService} from '../../shared/format.service';

import { AddClimbComponent} from '../add-climb/add-climb.component';
@Component({
  selector: 'log-list',
  animations: [
    trigger('toggleModal', [
      transition('void=>*', [
        query('#add-modal', style({opacity: 0, transform: 'scale(0.01)'}), {optional: true}),
        query('#add-modal',
          animate( '.3s ease-in', 
            keyframes([
              style({opacity: 0, transform: 'scale(0.01)', offset: 0}),
              style({opacity: 1, transform: 'scale(1.0)', offset: 1})
            ])
          )
        )
      ]),
      transition('*=>void', [
        query('#add-modal', style({opacity: 1, transform: 'scale(1)'}), {optional: true}),
        query('#add-modal',
          animate( '.3s ease-in', 
            keyframes([
              style({opacity: 1, transform: 'scale(1)', offset: 0}),
              style({opacity: 0, transform: 'scale(.01)', offset: 1})
            ])
          )
        )
      ])
    ])
  ],
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
  
})
export class LogListComponent implements OnInit {

  logBook: Array<{}> = [];
  currentSort: string = 'Date';
  currentSortOrder: string = 'desc';
  addClimbVisible: boolean = false;
  filter = {
    by: '',
    value: '',
  };
  @Input() parentFilter;

  constructor(private logbookService: LogbookService, private formatService: FormatService) { }

  sortBy(param){
    let sortOrder = (this.currentSort === param) ? ((this.currentSortOrder === 'desc')? 'asc': 'desc') : 'desc';
    this.formatService.sortTable(this.logBook, param, sortOrder).subscribe(data => {
      this.currentSort = param;
      this.currentSortOrder = sortOrder;
    })
  }

  filterTable(type, value){
    this.parentFilter.by = type;
    this.parentFilter.value = value;
  }

  toggleAddClimb(){
    this.addClimbVisible = !this.addClimbVisible;
  }

  ngOnInit() {
    this.logbookService.getLogbook().subscribe(data => {
      this.formatService.sortTable(data, this.currentSort, this.currentSortOrder).subscribe(data =>{
        this.logBook = data;
        console.log(data);
      })
    });
  }
}
