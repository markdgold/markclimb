import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare const $:any;

@Component({
  selector: 'vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styleUrls: ['./vimeo-player.component.scss']
})
export class VimeoPlayerComponent implements OnInit {
  @Input() video;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  videoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://player.vimeo.com/video/"+this.video.id+"?badge=0&autopause=0&player_id=0");
  }
}