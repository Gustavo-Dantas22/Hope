import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'vex-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    fadeInUp400ms
  ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private _loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(12)],
      passwordConfirm: ['', Validators.required],
      termoDeUso: [false]
    });
  }

  get f() { return this.form.controls; }

  send() {
    if (this.form.value.termoDeUso === false) {
      this.snackBar.open('É necessário aceitar os termos de uso!', 'Ok');
    }

    const pws = this.form.value.password;
    const pwsConfirm = this.form.value.passwordConfirm;
    const email = this.form.value.email;

    if (pws === pwsConfirm) {
      this._loginService.createAccount(email, pws)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((err) => {
          console.log('erro', err);
        });
    }

  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
