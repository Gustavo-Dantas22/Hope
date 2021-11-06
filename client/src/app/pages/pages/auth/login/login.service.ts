import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { User } from '../../../../models/user.model';
import { Perfil } from 'src/app/models/perfil.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private userCollection: AngularFirestoreCollection<User> = this._angularFireStore.collection('usuarios');
    private profileCollection: AngularFirestoreCollection<Perfil> = this._angularFireStore.collection('perfil');

    constructor(
        private _angularFireStore: AngularFirestore,
        private _angularFireAuth: AngularFireAuth
    ) { }

    login(user: string, psw: string): Observable<User> {
        return from(this._angularFireAuth.signInWithEmailAndPassword(user, psw))
            .pipe(
                switchMap((u: firebase.default.auth.UserCredential) => this.userCollection.doc<User>(u.user.uid).valueChanges()),
                catchError(() => throwError('Usuário Incorreto'))
            );
    }

    createAccount(email: string, psw: string): Promise<void> {
        this._angularFireAuth.createUserWithEmailAndPassword(email, psw);

        const genericProfile = this.generateGenericProfile(email);
        genericProfile.id = this._angularFireStore.createId();

        return this.profileCollection.doc(genericProfile.id).set(genericProfile);
    }

    logout(): void {
        this._angularFireAuth.signOut();
    }

    getEmail(): string {
        return localStorage.getItem('HopeUserEmail');
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

    private generateGenericProfile(email: string): Perfil {
        const profile: Perfil = {
            dataNasc: new Date(),
            cpf: null,
            nome: email,
            email,
        };

        return profile;
    }
}
