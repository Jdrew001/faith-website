import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserConstant } from './user.constant';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { UserTableModel } from './user-table.model';
import { BaseService, RequestType } from 'src/app/core/services/base.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable()
export class UserService extends BaseService {

  userDetailsSubject: Subject<UserTableModel> = new Subject();
  userDetails$ = this.userDetailsSubject.asObservable();
  tableRefreshSubject: Subject<boolean> = new Subject();
  tableRefresh$ = this.tableRefreshSubject.asObservable();

  constructor(private helperService: HelperService, protected httpClient: HttpClient, protected store: Store,
    protected router: Router, protected notificationService: NotificationService) {
      super(notificationService, store, router, httpClient);
    }

    fetchUsers() {
      const url = this.helperService.getResourceUrl(UserConstant.FETCH_ALL_URL, false);
      return this.authHttpRequest(RequestType.GET, url) as Observable<UserTableModel[]>;
    }

    fetchUser(email) {
      const url = this.helperService.getResourceUrl(UserConstant.FETCH_USER + '/' + email, false);
      return this.authHttpRequest(RequestType.POST, url) as Observable<UserTableModel>;
    }

    addNewUser(userModel) {
      const url = this.helperService.getResourceUrl(UserConstant.CREATE_USER, false);
      return this.authHttpRequest(RequestType.POST, url, userModel) as Observable<UserTableModel>;
    }

    updateUser(userModel, userEmail) {
      const url = this.helperService.getResourceUrl(UserConstant.UPDATE_USER + '/' + userEmail, false);
      return this.authHttpRequest(RequestType.POST, url, userModel) as Observable<UserTableModel>;
    }

    updateUserPassword(passwordModel) {
      const url = this.helperService.getResourceUrl(UserConstant.UPDATE_USER_PASSWORD, false);
      return this.authHttpRequest(RequestType.POST, url, passwordModel);
    }

    deleteUser(email) {
      const url = this.helperService.getResourceUrl(UserConstant.DELETE_USER + '/' + email, false);
      return this.authHttpRequest(RequestType.POST, url);
    }
}
