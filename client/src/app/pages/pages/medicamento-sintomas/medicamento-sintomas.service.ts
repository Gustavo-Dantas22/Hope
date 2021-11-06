import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Remedios } from 'src/app/models/remedios.model';
import { Sintomas } from 'src/app/models/sintomas.model';

@Injectable({
    providedIn: 'root'
})
export class MedicamentoSintomasService {
    private remediosCollection: AngularFirestoreCollection<Remedios> = this._angularFireStore.collection('remedios');
    private sintomasCollection: AngularFirestoreCollection<Sintomas> = this._angularFireStore.collection('sintomas');

    constructor(
        private http: HttpClient,
        private _angularFireStore: AngularFirestore
    ) { }

    getRemedios(email: string): Observable<Remedios[]> {
        return this.remediosCollection.valueChanges()
            .pipe(
                map(x => {
                    if (x.length > 0) {
                        return x.filter(y => y.email === email);
                    }
                })
            );
    }

    addRemedio(remedio: Remedios): Promise<void> {
        remedio.id = this._angularFireStore.createId();

        return this.remediosCollection.doc(remedio.id).set(remedio);
    }

    removerRemedio(remedio: Remedios) {
        return this.remediosCollection.doc(remedio.id).delete();
    }

    removerAgenda(remedio: Remedios): Observable<any> {
        const remedioToRemoveModel = {
            name: remedio.nome,
            times: remedio.recorrencia,
            id: remedio.id
        }

        return this.http.post('http://localhost:5000/medicine/remove', remedioToRemoveModel);
    }

    agendar(remedio: Remedios, email: string): Observable<any> {
        const remedioModel = {
            name: remedio.nome,
            dosage: remedio.dosagem,
            startDate: remedio.dataInicio,
            recurringHours: remedio.recorrencia,
            medicineFrequency: +remedio.frequencia,
            times: remedio.times,
            email: email,
            id: remedio.id
        }

        return this.http.post('http://localhost:5000/medicine', remedioModel);
    }

    getSintomas(email: string): Observable<Sintomas[]> {
        return this.sintomasCollection.valueChanges()
            .pipe(
                map(x => {
                    if (x.length > 0) {
                        return x.filter(y => y.email === email);
                    }
                })
            );
    }

    removerSintoma(sintoma: Sintomas) {
        return this.sintomasCollection.doc(sintoma.id).delete();
    }

    addSintoma(sintoma: Sintomas): Promise<void> {
        sintoma.id = this._angularFireStore.createId();

        return this.sintomasCollection.doc(sintoma.id).set(sintoma);
    }
}
