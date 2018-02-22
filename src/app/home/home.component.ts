import { Component, OnInit } from '@angular/core';

declare var $ :any;

@Component({
  selector: 'mdg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() :void {
    $(document).alton({
      firstClass: 'hero',
      bodyContainer: 'bodyContainer',
      scrollMode: 'headerScroll'
    });
  }

}
