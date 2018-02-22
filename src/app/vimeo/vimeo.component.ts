import { Component, OnInit } from '@angular/core';
import { VimeoService } from './vimeo.service';

import { Ivimeopost } from './ivimeopost';

import { VimeoPlayerComponent } from './vimeo-player.component';

declare var $ :any;

@Component({
  selector: 'mdg-vimeo',
  templateUrl: './vimeo.component.html',
  styleUrls: ['./vimeo.component.scss'],
})
export class VimeoComponent implements OnInit {
  vimeoList: Ivimeopost[];
  video: Object;
  handle: string = "/markdgold";
  link: string = "https://www.vimeo.com/markdgold"
  constructor(private vimeoService: VimeoService) {}

  ngOnInit() {
    this.vimeoService.getVimeoLinks().subscribe(videos => {
      this.vimeoList = videos.slice(0,4);
    });
  }
}
