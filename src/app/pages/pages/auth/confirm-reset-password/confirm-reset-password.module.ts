import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmResetPasswordComponent } from './confirm-reset-password.component';
import { ConfirmResetPasswordRoutingModule } from './confirm-reset-password-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  imports: [
    CommonModule,
    ConfirmResetPasswordRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    IconModule,
    MatIconModule,
    MatSnackBarModule
  ],
  declarations: [ConfirmResetPasswordComponent]
})
export class ConfirmResetPasswordModule { }
