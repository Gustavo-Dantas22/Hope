import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Perfil } from 'src/app/models/perfil.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SocialService {
    private perfilCollection: AngularFirestoreCollection<Perfil> = this._angularFireStore.collection('perfil');

    constructor(
        private _angularFireStore: AngularFirestore
    ) { }

    getPerfil(email: string): Observable<Perfil[]> {
        return this.perfilCollection.valueChanges()
            .pipe(
                map(x => {
                    if (x.length > 0) {
                        return x.filter(y => y.email === email);
                    }
                })
            );
    }

    updatePerfil(perfil: Perfil): Promise<void> {
        return this.perfilCollection.doc(perfil.id)
            .set(perfil);
    }
}