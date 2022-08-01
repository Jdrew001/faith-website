import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { AuthenticationConstant } from './authentication.constant';
import { HttpClient } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {

  token = '';

  constructor(private helperService: HelperService, private httpClient: HttpClient) { }

  login(data: any):Observable<any> {
    const url = this.helperService.getResourceUrl(AuthenticationConstant.AUTH_URL, false);
    return this.httpClient.post(url, data);
  }
}
