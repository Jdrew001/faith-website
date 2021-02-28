import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthorizationService } from './authorization.service';
import { CoreConstant } from '../core.constant';
import { FetchUserAction } from 'src/app/shared/store/token/actions/fetch-user.action';

@Injectable()
export class AuthenticationGuardService implements CanActivate {

  constructor(private store: Store, private router: Router, private authorizationService: AuthorizationService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.store.selectSnapshot(TokenState.token) === null) {
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }
}
