import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { VimeoService } from './vimeo/vimeo.service';
import { InstagramService } from './instagram/instagram.service';

import { Globals } from '../../globals';
import { VimeoPlayerComponent } from './vimeo/vimeo-player.component';

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
    AppRoutingModule,
    HttpModule,
  ],
  providers: [Globals, VimeoService, InstagramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
