import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { VimeoPlayerComponent } from './vimeo/vimeo-player.component';

import { VimeoService } from './vimeo/vimeo.service';

import { Globals } from '../../globals';
import { SharedModule } from '../app/shared/shared.module'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavBarComponent,
    FooterComponent,
    VimeoPlayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    SharedModule,
  ],
  providers: [Globals, VimeoService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
