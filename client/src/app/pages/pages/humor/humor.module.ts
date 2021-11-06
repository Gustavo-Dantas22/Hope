import { HumorRoutingModule } from './humor.routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { HumorComponent } from './humor.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [HumorComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    HumorRoutingModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
  ]
})

export class HumorModule {
}
