import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'insta-square',
  templateUrl: './insta-square.component.html',
  styleUrls: ['./insta-square.component.scss']
})
export class InstaSquareComponent implements OnInit {
  @Input() imageUrl;
  @Input() embedLink;
  @Input() imageData;

  openModal(embedLink) {
    this.onSquareClick.emit(embedLink)
  }
  constructor() { }

  ngOnInit() {
  }
  @Output() onSquareClick = new EventEmitter<string>();
}
