import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'mdg-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isHome :boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url === "/about" || event.url === "/"){
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    });
    $(function (){
      $(window).scroll(function() {
        if ($('.footer-home').length > 0){
          if ($(window).scrollTop() > 1000) {
            $('.footer-home').css('visibility','visible')
          } else{
            $('.footer-home').css('visibility','hidden')
          }
        }
      })
    })
  }
      
}
