import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private subject = new BehaviorSubject<boolean>(true);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.subject.getValue()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
  constructor(public auth: AuthService, public router: Router) {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.subject.next(isLoggedIn);
    });
  }
}
