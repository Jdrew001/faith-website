import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { TokenModel } from 'src/app/shared/store/token/token.model';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CoreConstant } from '../core.constant';
import { LogoutAction } from 'src/app/shared/store/token/actions/logout.action';

export enum RequestType {
  GET,
  POST
}

@Injectable()
export class BaseService {

  constructor(protected notificationService: NotificationService, protected store: Store,
    protected router: Router, protected httpClient: HttpClient) { }

  protected authHttpRequest(requestType: RequestType, url: string, body?, formData = false) {
    if (this.validateToken()) {
      switch (requestType) {
        case RequestType.GET: 
          return this.getRequest(true, url);
        break;
        case RequestType.POST:
          if (formData) {
            return this.postRequest(true, url, body, formData);
          }
          return this.postRequest(true, url, body);
        break;
      }
    }

    return null;
  }

  protected publicHttpRequest(requestType: RequestType, url: string, body?) {
    switch (requestType) {
      case RequestType.GET: 
        return this.getRequest(false, url);
      break;
      case RequestType.POST:
        return this.postRequest(false, url, body);
      break;
    }

    return null;
  }

  private validateToken() {
    if (this.getToken()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    this.notificationService.displayError(CoreConstant.UNAUTHORIZED_ERROR, 'Authentication');
    this.store.dispatch(new LogoutAction());
    return false;
  }

  private getRequest(token: boolean, url: string) {
    let headers;
    token ? headers = this.getAuthHeader() : headers = this.getHeader();
    return this.httpClient.get(url, { headers });
  }

  private postRequest(token, url, body?, formData?) {
    let headers;
    token ? headers = this.getAuthHeader(formData) : headers = this.getHeader(formData);
    
    if (body) {
      return this.httpClient.post(url, body , { headers });
    }

    return this.httpClient.post(url, {}, { headers });
  }

  private getHeader(formData?) {
    if (formData) {
      return new HttpHeaders({});
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  private getToken() : TokenModel {
    return this.store.selectSnapshot(TokenState.token);
  }

  private getAuthHeader(formData?) {
    if (formData) {
      return new HttpHeaders({
        'Authorization': 'Token ' + this.getToken()
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.getToken()
    });
  }
}
