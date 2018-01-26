import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { InstagramComponent } from './instagram/instagram.component';
import { VimeoComponent } from './vimeo/vimeo.component';

const routes: Routes = [
  { path: 'about', loadChildren: 'app/home/home.module#HomeModule' },
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'instagram', component: InstagramComponent },
  { path: 'vimeo', component: VimeoComponent },
  // { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InstagramComponent, VimeoComponent] 