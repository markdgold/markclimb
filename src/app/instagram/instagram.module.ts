import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InstagramComponent } from './instagram.component';

import { SharedModule } from '../shared/shared.module';
import { InstagramService } from './instagram.service';
import { InstaSquareComponent } from './insta-square.component';
import { InstaModalComponent } from './insta-modal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: InstagramComponent}]),
    SharedModule,
  ],
  declarations: [InstagramComponent, InstaSquareComponent, InstaModalComponent],
  providers: [InstagramService]
})
export class InstagramModule { }
