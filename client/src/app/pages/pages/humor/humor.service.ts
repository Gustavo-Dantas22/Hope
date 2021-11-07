import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { Humor } from 'src/app/models/humor.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HumorService {
    private humorCollection: AngularFirestoreCollection<Humor> = this._angularFireStore.collection('humor');

    constructor(
        private _angularFireStore: AngularFirestore
    ) { }

    addHumor(humor: Humor): Promise<void> {
        humor.id = this._angularFireStore.createId();

        return this.humorCollection.doc(humor.id).set(humor);
    }

    getHumor(email: string): Observable<Humor[]> {
        return this.humorCollection.valueChanges()
            .pipe(
                map(x => {
                    if (x.length > 0) {
                        return x.filter(y => y.email === email);
                    }
                })
            )
    }
}