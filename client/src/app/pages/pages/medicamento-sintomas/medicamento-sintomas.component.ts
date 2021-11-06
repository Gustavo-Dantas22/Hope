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
import { SwPush } from '@angular/service-worker';

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

  vapidKeys = 'BLmLQP-fK9mzfjTiWfANjukqJlf8YiKgX3DHUOAgGskXVlK0RX-ZrdobGFmkdc_aXRnBaHw3fA6CJPL61YLQ2jQ';

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
              private swPush: SwPush,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('HopeUserEmail');
    this.recuperarRemedios();
    this.recuperarSintomas();

    if (navigator.serviceWorker) {
      // First, do a one-off check if there's currently a service worker in control.

      if (navigator.serviceWorker.controller) {
        console.log(`This page is currently controlled by: ${navigator.serviceWorker.controller}`);
        navigator.serviceWorker.controller.onstatechange = function() {
          console.log('state' + navigator.serviceWorker.controller.state);
        };
      } else {
        // This happens on ctrl+f5(force refresh)
        console.log('This page is not currently controlled by a service worker.');
        navigator.serviceWorker.register('./ngsw-worker.js').then(function(registration) {
          console.log('Service worker registration succeeded:', registration);
          window.location.reload();
        })
          // tslint:disable-next-line: only-arrow-functions
          // tslint:disable-next-line: no-unused-expression
          // tslint:disable-next-line: only-arrow-functions
          // tslint:disable-next-line: no-unused-expression
          , function(error: any) {
            console.log('Service worker registration failed:', error);
          };
      }
      // Then, register a handler to detect when a new or
      // updated service worker takes control.
      // tslint:disable-next-line: only-arrow-functions
      navigator.serviceWorker.oncontrollerchange = function() {
        console.log('This page is now controlled by:', navigator.serviceWorker.controller);
      };
    }
    else {
      console.log('Service workers are not supported.');
    }
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

  removerRemedio(remedio): void {
    this._medicamentoSintomasService.removerRemedio(remedio);
  }

  removerSintomas(sintoma): void {
    this._medicamentoSintomasService.removerSintoma(sintoma);
  }

  notification(): void {
    if (this.swPush.isEnabled) {
      this.swPush.notificationClicks.subscribe(x => console.log(x), err => console.log(err));
      this.swPush.requestSubscription({
        serverPublicKey: this.vapidKeys
      })
        .then(sub => {
          this._medicamentoSintomasService.subscribe(sub).subscribe(x => console.log(x), err => console.log(err));
        })
        .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }
}
