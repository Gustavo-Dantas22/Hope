import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class SocialService {
    constructor(
        private _angularFireStore: AngularFirestore,
        private _angularFireAuth: AngularFireAuth
    ) { }
}