import { Component, OnInit, Input } from '@angular/core';

import { FormatService } from '../format.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'subhead',
  templateUrl: './subhead.component.html',
  styleUrls: ['./subhead.component.scss']
})
export class SubheadComponent implements OnInit {
  @Input()  handle: string;
  @Input()  link: string;
  isMobile: boolean;
  subscription: Subscription;

  checkMobile() {
    if (window.screen.availWidth < 1025) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  ngOnInit(){
    this.checkMobile();
  }
}
