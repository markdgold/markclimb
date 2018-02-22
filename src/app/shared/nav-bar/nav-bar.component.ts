import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FormatService } from '../format.service';
import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isAbout :boolean;
  isMobile :string;
  subscription: Subscription;

  constructor(private router: Router, private formatService: FormatService) {
    this.subscription = formatService.getFlag('header').subscribe(flag => {console.log('flag',flag); this.isMobile = flag});
  }
  
  ngOnInit() {
    console.log('~~~loading head')
    this.router.events.subscribe((event: any) => {
      if (event.url === "/about"){
        this.isAbout = true;
      } else {
        this.isAbout = false;
      }
    })
    console.log('header flag', this.isMobile)
    $('ul.right').hover( //fix this
      ()=>{
        $('div.header h1.desktop').css('padding-right', '57px');
      },
      ()=>{
        $('div.header h1.desktop').css('padding-right', '7px');
      }
    )
  }
}
