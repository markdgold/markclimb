import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'mdg-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsComponent implements OnInit {
  mobile: boolean = false;
  constructor() { }

  ngOnInit() {
    if (window.screen.availWidth <= 770) {
      this.mobile = true;
      console.log('mobile');
    }
  }

}
