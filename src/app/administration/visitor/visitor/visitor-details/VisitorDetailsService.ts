import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { VisitorConstant } from '../visitor.constant';
import { Observable, Subject } from 'rxjs';
import { VisitorModel } from '../../add-visitor/visitor.model';
import { BaseService, RequestType } from 'src/app/core/services/base.service';

@Injectable()
export class VisitorDetailsService extends BaseService {

    visitorDetailsSubject: Subject<any> = new Subject();
    visitorDetails$ = this.visitorDetailsSubject.asObservable();

    constructor(private helperService: HelperService, protected httpClient: HttpClient, protected store: Store,
        protected notificationService: NotificationService, protected router: Router) {
        super(notificationService, store, router, httpClient);
    }

    fetchVisitor(id) {
        const url = this.helperService.getResourceUrl(VisitorConstant.VISITOR + '/' + id, false);
        return this.authHttpRequest(RequestType.POST, url) as Observable<VisitorModel>;
    }

    updateVisitor(visitorModel: VisitorModel) {
        const url = this.helperService.getResourceUrl(VisitorConstant.UPDATE_VISITOR, false);
        return this.authHttpRequest(RequestType.POST, url, visitorModel) as Observable<VisitorModel>;
    }

    deleteVisitor(visitorId) {
        const url = this.helperService.getResourceUrl(VisitorConstant.DELETE_VISITOR + '/' + visitorId, false);
        return this.authHttpRequest(RequestType.POST, url);
    }
}
