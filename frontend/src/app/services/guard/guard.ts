import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/loginservice.service';

@Injectable({
    providedIn: 'root'
})
export class GuardService implements CanActivate, CanActivateChild {
    constructor(private loginservice: LoginService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.loginservice.isAuthenticated()
    }
    canActivateChild(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}
