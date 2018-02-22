import { Component, OnInit } from '@angular/core';
import * as Instafeed from 'instafeed.js';

import { InstagramService } from './instagram.service';

import { Iinstapost } from './iinstapost';
import { FormatService } from '../shared/format.service';

declare var $:any;

@Component({
  selector: 'mdg-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent implements OnInit {
  handle: string = "@markdgold";
  images: Iinstapost[];

  constructor(private instagramService: InstagramService, private formatService: FormatService ) {
    formatService.getFlag('insta').subscribe(flag => {console.log('flag from insta', flag)})
  }

  ngOnInit() {
    this.instagramService.getUserMedia().subscribe(data => {
      this.images = data;
      console.log(data[0]);
      console.log(data[1]);
      $('.isLoading').css('display', 'none'); //fix this
    });
  }

}