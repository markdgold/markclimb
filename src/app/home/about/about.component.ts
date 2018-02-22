import { Component, OnInit } from '@angular/core';

import { FormatService } from '../../shared/format.service';

@Component({
  selector: 'mdg-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isMobile: boolean;
  constructor(private formatService: FormatService) { }

  ngOnInit() {
    // this.isMobile = this.formatService.isMobile
  }

}
