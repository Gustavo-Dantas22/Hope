import { Component, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import icPerson from '@iconify/icons-ic/twotone-person';
import { LoginService } from 'src/app/pages/pages/auth/login/login.service';
import { SocialService } from '../../social.service';
import { Perfil } from 'src/app/models/perfil.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import icShield from '@iconify/icons-ic/twotone-shield';
import icCake from '@iconify/icons-ic/cake';
import data from '@iconify/icons-ic/twotone-visibility';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-social-profile-edit',
  templateUrl: './social-profile-edit.component.html',
  styleUrls: ['./social-profile-edit.component.scss']
})
export class SocialProfileEditComponent implements OnInit {

  editPerfilForm: FormGroup;

  icPerson = icPerson;
  icShield = icShield;
  icCake = icCake;
  icClose = icClose;

  perfil: Perfil;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _socialService: SocialService,
    private _loginService: LoginService) {
    this.editPerfilForm = this.fb.group({
      cpf: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      dataNasc: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const email = this._loginService.getEmail();
    this.recuperaPerfil(email);
  }

  send(): void {
    this._socialService.updatePerfil(this.editPerfilForm.value)
      .then(
        () => {
          this.snackBar.open('Sucesso', 'Seus dados foram atualizados!');
        }
      );
  }

  private recuperaPerfil(email: string): void {
    this._socialService.getPerfil(email)
      .subscribe(
        (perfil) => {
          this.perfil = perfil[0];
          this.preencheFormulario(this.perfil);
        }
      );
  }

  private preencheFormulario(perfil: Perfil) {
    const dataNasc = new Date(+perfil.dataNasc);
    perfil.dataNasc = dataNasc.getFullYear() + '-' + dataNasc.getMonth() + '-' + dataNasc.getDay();
    this.editPerfilForm.patchValue(perfil);
  }
}
