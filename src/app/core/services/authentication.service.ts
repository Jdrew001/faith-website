import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { AuthenticationConstant } from './authentication.constant';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LogoutAction } from 'src/app/shared/store/token/actions/logout.action';
import { TokenModel } from 'src/app/shared/store/token/token.model';

@Injectable()
export class AuthenticationService {

  token = '';

  constructor(private helperService: HelperService, private httpClient: HttpClient, private store: Store) { }

  login(data: any):Observable<any> {
    const url = this.helperService.getResourceUrl(AuthenticationConstant.AUTH_URL, false);
    return this.httpClient.post(url, data);
  }

  logout() {
    this.store.dispatch(new LogoutAction());
  }
}
