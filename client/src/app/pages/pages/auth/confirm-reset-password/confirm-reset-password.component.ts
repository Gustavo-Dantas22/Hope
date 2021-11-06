import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'vex-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent implements OnInit {

  code: string;
  form = this.fb.group({
    password: [null, Validators.required],
    passwordConfirm: [null, Validators.required],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _loginService: LoginService,
    private snackbar: MatSnackBar) {
    this.code = this.route.snapshot.queryParams['oobCode'];
    console.log(this.route.snapshot);
  }

  ngOnInit() {
  }

  send() {
    const password = this.form.value.password;
    const passwordConfirm = this.form.value.passwordConfirm;
    console.log(this.form.value);

    if (password !== passwordConfirm) {
      this.snackbar.open('As senhas devem coincidir', 'Ok');
      return;
    }

    this._loginService.resetPassword(this.code, password);
    this.router.navigate(['login']);
  }

}
