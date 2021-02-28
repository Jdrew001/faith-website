import { Injectable } from '@angular/core';
import { HelperService } from '../../../core/services/helper.service';
import { AddVisitorConstant } from './add-visitor.constant';
import { HttpClient } from '@angular/common/http';
import { VisitorModel } from './visitor.model';
import { Store } from '@ngxs/store';
import { BaseService, RequestType } from 'src/app/core/services/base.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable()
export class AddVisitorService extends BaseService {

  constructor(protected notificationService: NotificationService, protected httpClient: HttpClient, private helperService: HelperService,
    protected store: Store, protected router: Router) {
      super(notificationService, store, router, httpClient);
    }

  addVisitor(data: VisitorModel) {
    const url = this.helperService.getResourceUrl(AddVisitorConstant.VISITOR_URL, false);
    return this.authHttpRequest(RequestType.POST, url, data);
  }
}
