import icClose from '@iconify/icons-ic/twotone-close';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicamentoSintomasService } from '../../medicamento-sintomas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'vex-sintomas-edit',
  templateUrl: './sintomas-edit.component.html',
  styleUrls: ['./sintomas-edit.component.scss']
})
export class SintomasEditComponent implements OnInit {

  sintomasForm: FormGroup;
  icClose = icClose;
  constructor(
    private _fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialogRef<SintomasEditComponent>,
    private _medicamentosSintomas: MedicamentoSintomasService
  ) { }

  ngOnInit() {
    this.sintomasForm = this._fb.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      duracao: ['', Validators.required],
      observacao: ['', Validators.required],
      email: [localStorage.getItem('HopeUserEmail'), Validators.required]
    });
  }

  send() {
    this._medicamentosSintomas.addSintoma(this.sintomasForm.value)
      .then(() => {
        this.snackBar.open('Sucesso', 'Sintoma adicionado com sucesso!');
        this.dialog.close();
      });
  }
}
