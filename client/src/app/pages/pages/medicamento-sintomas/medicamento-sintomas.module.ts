import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentoSintomasRoutingModule } from './medicamento-sintomas-routing.module';
import { MedicamentoSintomasComponent } from './medicamento-sintomas.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MedicamentoSintomasService } from './medicamento-sintomas.service';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [MedicamentoSintomasComponent],
  imports: [
    CommonModule,
    MedicamentoSintomasRoutingModule,
    IconModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    MedicamentoSintomasService
  ]
})

export class MedicamentoSintomasModule {
}
