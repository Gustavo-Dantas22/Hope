import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { MedicamentoSintomasComponent } from './medicamento-sintomas.component';


const routes: Routes = [
  {
    path: '',
    component: MedicamentoSintomasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class MedicamentoSintomasRoutingModule {
}
