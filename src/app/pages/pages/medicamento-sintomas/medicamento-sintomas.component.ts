import { FaqComponent } from './../faq/faq.component';
import { Component, OnInit } from '@angular/core';
import icBeenhere from '@iconify/icons-ic/twotone-beenhere';
import icStars from '@iconify/icons-ic/twotone-stars';
import icBusinessCenter from '@iconify/icons-ic/twotone-business-center';
import icPhoneInTalk from '@iconify/icons-ic/twotone-phone-in-talk';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMedication from '@iconify/icons-ic/twotone-medication';
import icThermostat from '@iconify/icons-ic/twotone-thermostat';
import { stagger60ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MedicamentoSintomasService } from './medicamento-sintomas.service';
import { Remedios } from 'src/app/models/remedios.model';
import { Sintomas } from 'src/app/models/sintomas.model';
import { MatDialog } from '@angular/material/dialog';
import { RemediosFormComponent } from './components/remedios-edit/remedios-form.component';
import { SintomasEditComponent } from './components/sintomas-edit/sintomas-edit.component';

@Component({
  selector: 'vex-medicamento-sintomas',
  templateUrl: './medicamento-sintomas.component.html',
  styleUrls: ['./medicamento-sintomas.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class MedicamentoSintomasComponent implements OnInit {

  email: string;
  remedios: Remedios[];
  sintomas: Sintomas[];

  icBeenhere = icBeenhere;
  icStars = icStars;
  icBusinessCenter = icBusinessCenter;
  icPhoneInTalk = icPhoneInTalk;
  icMail = icMail;
  icMedication = icMedication;
  icThermostat = icThermostat;

  constructor(private _medicamentoSintomasService: MedicamentoSintomasService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('HopeUserEmail');
    this.recuperarRemedios();
    this.recuperarSintomas();
  }

  recuperarRemedios() {
    this._medicamentoSintomasService.getRemedios(this.email)
      .subscribe((data) => {
        this.remedios = data;
      });
  }

  recuperarSintomas() {
    this._medicamentoSintomasService.getSintomas(this.email)
      .subscribe((data) => {
        this.sintomas = data;
      });
  }

  modalRemedio(): void {
    this.dialog.open(RemediosFormComponent);
  }

  modalSintomas(): void {
    this.dialog.open(SintomasEditComponent);
  }
}
