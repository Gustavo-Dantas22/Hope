import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicamentoSintomasRoutingModule } from './medicamento-sintomas-routing.module';
import { MedicamentoSintomasComponent } from './medicamento-sintomas.component';
import { IconModule } from '@visurel/iconify-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule, SwRegistrationOptions } from '@angular/service-worker';
import { MedicamentoSintomasService } from './medicamento-sintomas.service';
import { environment } from 'src/environments/environment';

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
    ServiceWorkerModule.register('ngsw-worker.js')],
  providers: [
    MedicamentoSintomasService,
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: true }),
    },
  ]
})

export class MedicamentoSintomasModule {
}
