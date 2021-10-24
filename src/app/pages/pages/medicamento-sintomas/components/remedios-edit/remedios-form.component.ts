import icClose from '@iconify/icons-ic/twotone-close';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicamentoSintomasService } from '../../medicamento-sintomas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-medicamento-sintomas-edit',
  templateUrl: './remedios-form.component.html',
  styleUrls: ['./remedios-form.component.scss']
})
export class RemediosFormComponent implements OnInit {

  icClose = icClose;
  remedioForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<RemediosFormComponent>,
    private _medicamentoSintomas: MedicamentoSintomasService
  ) {
  }

  ngOnInit() {
    this.remedioForm = this._fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      dosagem: ['', Validators.required],
      tempoDeUso: ['', Validators.required],
      frequencia: ['', Validators.required],
      email: [localStorage.getItem('HopeUserEmail'), Validators.required],
    });
  }

  send() {
    this._medicamentoSintomas.addRemedio(this.remedioForm.value)
      .then(() => {
        this.snackBar.open('Sucesso', 'Remédio adicionado!');
        this.dialog.close();
      });
  }

}
