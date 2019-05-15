import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublicModule} from './public/public.module';

export function loadChildren() {
  return PublicModule;
}
const routes: Routes = [

  {
    path: '',
    loadChildren
  }
];

@NgModule({
  imports: [PublicModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
