import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  send() {
    const email = this.form.value.email;
    if (!email) {
      return;
    }

    this._loginService.sendPasswordResetEmail(email);
    this.snackbar.open('Um e-mail com as instruções para recuperar sua senha foi enviado!', 'Ok');
  }
}
