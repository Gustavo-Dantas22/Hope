import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '../../../../../@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '../../../../../@vex/animations/scale-in.animation';
import { stagger40ms } from '../../../../../@vex/animations/stagger.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icAdd from '@iconify/icons-ic/twotone-add';
import icWhatshot from '@iconify/icons-ic/twotone-whatshot';
import icWork from '@iconify/icons-ic/twotone-work';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icCheck from '@iconify/icons-ic/twotone-check';
import icEdit from '@iconify/icons-ic/twotone-edit';
import { MatDialog } from '@angular/material/dialog';
import { SocialProfileEditComponent } from '../components/social-profile-edit/social-profile-edit.component';
import { Perfil } from 'src/app/models/perfil.model';
import { LoginService } from 'src/app/pages/pages/auth/login/login.service';
import { SocialService } from '../social.service';
import icPerson from '@iconify/icons-ic/twotone-person';
import icShield from '@iconify/icons-ic/twotone-shield';
import icCake from '@iconify/icons-ic/cake';


@Component({
  selector: 'vex-social-profile',
  templateUrl: './social-profile.component.html',
  styleUrls: ['./social-profile.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    scaleIn400ms,
    stagger40ms
  ]
})
export class SocialProfileComponent implements OnInit {

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icEdit = icEdit;
  icPerson = icPerson;
  icShield = icShield;
  icCake = icCake;

  perfil: Perfil;

  constructor(
    private dialog: MatDialog,
    private _socialService: SocialService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    const email = this._loginService.getEmail();
    this.recuperaPerfil(email);
  }

  recuperaPerfil(email: string): void {
    this._socialService.getPerfil(email)
      .subscribe(
        (perfil) => {
          this.perfil = perfil[0];
        }
      );
  }

  openProfileEdit(id) {
    this.dialog.open(SocialProfileEditComponent, {
      data: id || null,
      width: '600px'
    });
  }
}
