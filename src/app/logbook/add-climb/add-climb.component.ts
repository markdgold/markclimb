import { Component, OnInit } from '@angular/core';
import {LogbookService} from '../logbook.service'

@Component({
  selector: 'mdg-add-climb',
  templateUrl: './add-climb.component.html',
  styleUrls: ['./add-climb.component.scss']
})
export class AddClimbComponent implements OnInit {

  addClimb(name, grade, date, location, tries, comment) {
    this.logbookService.addClimb(name, grade, location, Date.parse(date), tries, comment);
  }
  
  constructor(private logbookService: LogbookService) { }

  ngOnInit() {
  }

}
