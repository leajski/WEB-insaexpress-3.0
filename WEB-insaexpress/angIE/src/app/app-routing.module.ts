import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { UploadphotosComponent } from './uploadphotos/uploadphotos.component';

const routes: Routes = [
	{ path: '', component: NewComponent },
	{ path: 'photos', component: UploadphotosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
