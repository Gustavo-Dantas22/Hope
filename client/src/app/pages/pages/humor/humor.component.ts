import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Humor } from 'src/app/models/humor.enum';
import { Humor as HumorModel } from 'src/app/models/humor.model';
import { HumorService } from './humor.service';

@Component({
  selector: 'vex-humor',
  templateUrl: './humor.component.html',
  styleUrls: ['./humor.component.scss']
})
export class HumorComponent implements OnInit {
  displayedColumns: string[] = ['data', 'idHumor'];
  displayedColumnsContador: string[] = ['idHumor', 'quantidade'];

  dataSource = [];
  dataSourceContador = [];

  HUMOR_ENUM = Humor;

  email: string;
  constructor(
    private humorService: HumorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('HopeUserEmail');

    this.humorService.getHumor(this.email)
      .subscribe(
        (res) => {
          this.dataSource = res;
          this.buscaContadorHumor(res);
        }
      )
  }

  registraHumor(idHumor: number): void {
    if (!this.isValid()) {
      this.snackBar.open('Seu humor hoje já foi registrado!', 'Ok');
      return;
    }

    const humor: HumorModel = {
      data: new Date().toDateString(),
      email: this.email,
      idHumor: idHumor
    }

    this.humorService.addHumor(humor)
      .then(() => {
        this.snackBar.open('Seu humor do dia de hoje já foi registrado', 'Ok');
      });
  }

  isValid(): boolean {
    if (!this.dataSource) {
      return true;
    }

    const humor = this.dataSource.filter(x => new Date(x.data).getDay() === new Date().getDay()
      && new Date(x.data).getMonth() === new Date().getMonth()
      && new Date(x.data).getFullYear() === new Date().getFullYear());

    if (humor.length > 0)
      return false;

    return true;
  }

  buscaContadorHumor(humores: HumorModel[]) {
    const quantidadeHumor = [
      {
        idHumor: Humor.Alegria,
        quantidade: this.contaHumor(humores, Humor.Alegria)
      },
      {
        idHumor: Humor.Assustado,
        quantidade: this.contaHumor(humores, Humor.Assustado)
      },
      {
        idHumor: Humor.Confusao,
        quantidade: this.contaHumor(humores, Humor.Confusao)
      },
      {
        idHumor: Humor.Raiva,
        quantidade: this.contaHumor(humores, Humor.Raiva)
      },
      {
        idHumor: Humor.Tristeza,
        quantidade: this.contaHumor(humores, Humor.Tristeza)
      }
    ];

    this.dataSourceContador = quantidadeHumor;
  }

  contaHumor(humores: HumorModel[], idHumor: Humor): number {
    const resultado = humores.filter(x => x.idHumor == idHumor);
    return resultado.length;
  }

  getHumorString(idHumor): string {
    switch (idHumor) {
      case 0:
        return 'Alegria';

      case 1:
        return 'Assustado';

      case 2:
        return 'Raiva';

      case 3:
        return 'Tristeza';

      case 4:
        return 'Confusao';
    }
  }

  dataFormatter(data: any): string {
    return new Date(data).toLocaleDateString();
  }

}
