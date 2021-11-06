import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from '../pages/pages/auth/login/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private _loginService: LoginService,
        private _router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._loginService.authenticated()
            .pipe(
                tap(b => {
                    if (!b) {
                        this._router.navigateByUrl('/login');
                    }
                })
            );
    }
}
