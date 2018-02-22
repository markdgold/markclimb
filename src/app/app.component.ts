import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {FormatService} from './shared/format.service'

@Component({
  selector: 'mdg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mdg';
  isMobileFlag: boolean;

  constructor(private formatService: FormatService) {
  };
  
  ngOnInit() { 
    if (window.screen.availWidth < 1025) {
      this.formatService.updateFlag(true);
    } else {
      this.formatService.updateFlag(false);
    }
  }
}
