import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VimeoComponent } from './vimeo/vimeo.component';

const routes: Routes = [
  { path: 'about', loadChildren: 'app/home/home.module#HomeModule' },
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'instagram', loadChildren: 'app/instagram/instagram.module#InstagramModule' },
  { path: 'logbook', loadChildren: 'app/logbook/logbook.module#LogbookModule' },
  { path: 'vimeo', component: VimeoComponent },
  { path: '**', redirectTo: 'about', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [VimeoComponent] 