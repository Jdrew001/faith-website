import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class VisitorGuardService implements CanActivate {

  constructor(private store: Store, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.store.selectSnapshot(TokenState.username) === 'VisitorGreeter') {
      return this.router.parseUrl('/visitor-greeter');
    } else {
      return true;
    }
  }
}
