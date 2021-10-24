import { Component, OnInit } from '@angular/core';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { SocialService } from './social.service';
import { LoginService } from '../../pages/auth/login/login.service';
import { Perfil } from 'src/app/models/perfil.model';

export interface FriendSuggestion {
  name: string;
  imageSrc: string;
  friends: number;
  added: boolean;
}

@Component({
  selector: 'vex-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class SocialComponent implements OnInit {
  perfil: Perfil = {
    nome: 'Carregando',
    cpf: 'Carregando',
    dataNasc: new Date(),
    email: 'Carregando'
  };

  constructor(private _socialService: SocialService,
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
}
