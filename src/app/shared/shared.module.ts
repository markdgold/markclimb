import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubheadComponent } from './subhead/subhead.component';
import {FormatService } from './format.service';
// import { VermPipe } from './verm.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SubheadComponent,
  ],
  declarations: [ SubheadComponent ],
  providers: [FormatService]
})
export class SharedModule { }
