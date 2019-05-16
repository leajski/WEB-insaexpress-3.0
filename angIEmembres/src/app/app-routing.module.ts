import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { UploadphotosComponent } from './uploadphotos/uploadphotos.component';
import { DefisComponent } from './defis/defis.component';
import { ValidatephotosComponent } from './validatephotos/validatephotos.component';


const routes: Routes = [
	{ path: '', component: NewComponent },
	{ path: 'defis', component: DefisComponent },
	{ path: 'ajoutdefis', component: UploadphotosComponent },
	{ path: 'validerdefis', component: ValidatephotosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
