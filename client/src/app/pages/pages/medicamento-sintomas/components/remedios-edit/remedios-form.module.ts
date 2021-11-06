import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { IconModule } from '@visurel/iconify-angular';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RemediosFormComponent } from './remedios-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        FlexLayoutModule,
        MatInputModule,
        MatDividerModule,
        MatDatepickerModule,
        IconModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatButtonModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatSelectModule
    ],
    declarations: [RemediosFormComponent],
    entryComponents: [RemediosFormComponent]
})

export class RemediosFormModule { }