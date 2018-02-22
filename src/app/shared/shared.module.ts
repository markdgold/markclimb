import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubheadComponent } from './subhead/subhead.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    SubheadComponent,
  ],
  declarations: [ SubheadComponent],
})
export class SharedModule { }
