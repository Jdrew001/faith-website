import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { CoreConstant } from '../core.constant';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { LogoutAction } from 'src/app/shared/store/token/actions/logout.action';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private helperService: HelperService, private httpClient: HttpClient, private store: Store,
    private router: Router, private notificationService: NotificationService) { }

  checkForValidToken() {
    const url = this.helperService.getResourceUrl(CoreConstant.TOKEN_CHECK, false);
    const token = this.store.selectSnapshot(TokenState.token);
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Token ' + token
    });
    if (!isNullOrUndefined(token)) {
      this.httpClient.get(url, { headers }).subscribe(res => {
        console.log(res);
      }, error => {
        // TODO: Please relogin to continue
        if (error.status === 401) {
          this.notificationService.displayError(CoreConstant.UNAUTHORIZED_ERROR, 'Authentication');
        } else {
          this.notificationService.displayError(CoreConstant.SERVER_ERROR, 'Authentication');
        }
        this.store.dispatch(new LogoutAction());
        this.router.navigateByUrl('/login');
      });
    } else {
      this.router.navigateByUrl('/login');
      this.notificationService.displayError(CoreConstant.UNAUTHORIZED_ERROR, 'Authentication');
      this.store.dispatch(new LogoutAction());
    }
  }

  getLoggedInUser() {
    return this.store.selectSnapshot(TokenState.userEmail);
  }

  getUserRole() {
    return this.store.selectSnapshot(TokenState.globalRoleName);
  }

  checkStatus(code) {
    if (code === 401) {
      this.notificationService.displayError(CoreConstant.UNAUTHORIZED_ERROR, 'Authentication');
      this.router.navigateByUrl('/login');
      this.store.dispatch(new LogoutAction());
    } else {
      this.notificationService.displayError(CoreConstant.SERVER_ERROR, 'Authentication');
    }
  }
}
