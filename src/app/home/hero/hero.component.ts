import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'mdg-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#hero-vid').prop('muted',true);
  }

}
