import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LogbookService} from '../logbook.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { validateArgCount } from '@firebase/util';

declare var $:any;

@Component({
  selector: 'add-climb',
  templateUrl: './add-climb.component.html',
  styleUrls: ['./add-climb.component.scss']
})
export class AddClimbComponent implements OnInit {
  addForm: FormGroup;
  triesOptions = ['Flash', 'Second Go', 'Redpoint'];
  invalidForm: boolean;
  
  submitForm(): void {
    if(this.addForm.valid === true){
      this.logbookService.addClimb(this.addForm.value.Name, this.addForm.value.Grade, this.addForm.value.Location, Date.parse(this.addForm.value.Date), this.addForm.value.Tries, this.addForm.value.Comment)      
      this.addForm.reset();
      this.closeModal;
    } else {
      this.invalidForm = true;
    }
  }
  
  closeModal(e){
    this.onCloseModal.emit(false);
  }

  constructor(private logbookService: LogbookService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      Name:       ['', Validators.required],
      Grade:      ['', Validators.required],
      Location:   ['', Validators.required],
      Date:       ['', Validators.required],
      Tries:      ['', Validators.required],
      Comment:    ['', Validators.required]
    })
  }
  @Output() onCloseModal = new EventEmitter<boolean>();
}
