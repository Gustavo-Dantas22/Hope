import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { User } from '../../../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private usuariosCollection: AngularFirestoreCollection<User> = this._angularFireStore.collection('usuarios');
    constructor(
        private _angularFireStore: AngularFirestore,
        private _angularFireAuth: AngularFireAuth
    ) { }

    login(user: string, psw: string): Observable<User> {
        return from(this._angularFireAuth.signInWithEmailAndPassword(user, psw))
            .pipe(
                switchMap((u: firebase.default.auth.UserCredential) => this.usuariosCollection.doc<User>(u.user.uid).valueChanges()),
                catchError(() => throwError('Usuário Incorreto'))
            );
    }

    logout(): void {
        this._angularFireAuth.signOut();
    }

    getUser(): Observable<User> {
        return this._angularFireAuth.authState
            .pipe(
                switchMap((u) => u ? this.usuariosCollection.doc<User>(u.uid).valueChanges() : of(null))
            );
    }

    authenticated(): Observable<boolean> {
        return this._angularFireAuth.authState
            .pipe(
                map(u => (u) ? true : false)
            );
    }

    sendPasswordResetEmail(email: string): void {
        this._angularFireAuth.sendPasswordResetEmail(email);
    }

    resetPassword(code: string, newPassword: string) {
        this._angularFireAuth.confirmPasswordReset(code, newPassword);
    }
}
