import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentoSintomasRoutingModule } from './medicamento-sintomas-routing.module';
import { MedicamentoSintomasComponent } from './medicamento-sintomas.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [MedicamentoSintomasComponent],
  imports: [
    CommonModule,
    MedicamentoSintomasRoutingModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class MedicamentoSintomasModule {
}
