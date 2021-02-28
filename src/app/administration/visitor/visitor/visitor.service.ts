import { Injectable } from '@angular/core';
import { HelperService } from '../../../core/services/helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VisitorConstant } from './visitor.constant';
import { Store } from '@ngxs/store';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { VisitorModel } from '../add-visitor/visitor.model';
import { BaseService, RequestType } from 'src/app/core/services/base.service';


@Injectable()
export class VisitorService extends BaseService {

  tableRefreshSubject: Subject<any> = new Subject();
  tableRefresh$ = this.tableRefreshSubject.asObservable();

  constructor(private helperService: HelperService, protected httpClient: HttpClient, protected store: Store,
    protected notificationService: NotificationService, protected router: Router) {
      super(notificationService, store, router, httpClient);
    }

  fetchVisitors() {
    const url = this.helperService.getResourceUrl(VisitorConstant.VISITOR, false);
    return this.authHttpRequest(RequestType.GET, url) as Observable<VisitorModel[]>;
  }

  fetchVisitorKpi() {
    const url = this.helperService.getResourceUrl(VisitorConstant.VISITOR_KPI, false);
    return this.authHttpRequest(RequestType.GET, url);
  }

  fetchFilteredVisitors(filter) {
    const url = this.helperService.getResourceUrl(VisitorConstant.VISITOR_FILTER + '/' + filter, false);
    return this.authHttpRequest(RequestType.POST, url) as Observable<VisitorModel[]>;
  }
}
