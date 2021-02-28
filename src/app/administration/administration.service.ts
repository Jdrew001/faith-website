import { Injectable } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { Store } from '@ngxs/store';
import { UserConstant } from './user/user-management/user.constant';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserTableModel } from './user/user-management/user-table.model';
import { isNullOrUndefined } from 'util';
import { LogoutAction } from '../shared/store/token/actions/logout.action';
import { Router } from '@angular/router';

@Injectable()
export class AdministrationService {

  fetchUserSubject: Subject<boolean> = new Subject();
  fetchUser$ = this.fetchUserSubject.asObservable();

  constructor(private helperService: HelperService, private store: Store, private httpClient: HttpClient,
    private router: Router) { }

  fetchUser(email, token) {
    const url = this.helperService.getResourceUrl(UserConstant.FETCH_USER + '/' + email, false);
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'Token ' + token
    });
    return this.httpClient.post(url, { }, { headers }) as Observable<UserTableModel>;
  }

  validateSystemModule(mod, systemModules) {
    if (isNullOrUndefined(systemModules.find(o => o.name === mod))) {
      this.router.navigateByUrl('/administration/dashboard');
    }
  }
}
