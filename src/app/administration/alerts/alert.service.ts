import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { BaseService, RequestType } from 'src/app/core/services/base.service';
import { Store } from '@ngxs/store';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertConstant } from './alert.constant';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { Message } from './alert-messages/message.model';
import { AlertObservablesService } from './alert-observables.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService extends BaseService {

  constructor(private helperService: HelperService, protected httpClient: HttpClient, protected store: Store,
    protected notificationService: NotificationService, protected router: Router,
    private alertObservablesService: AlertObservablesService, private loaderService: LoaderService) {
      super(notificationService, store, router, httpClient);
    }

    fetchMessages() {
      const url = this.helperService.getResourceUrl(AlertConstant.MESSAGE_URL_JSON, true);
      this.loaderService.toggleLoader(true);
      this.authHttpRequest(RequestType.GET, url)
        .subscribe(res => this.alertObservablesService.notifyMessagesSubs(res), error => this.handleError(''), () => this.loaderService.toggleLoader(false));
    }

    fetchGroups() {
      const url = this.helperService.getResourceUrl(AlertConstant.GROUP_URL_JSON, true);
      this.loaderService.toggleLoader(true);
      this.authHttpRequest(RequestType.GET, url)
        .subscribe(res => this.alertObservablesService.notifyGroupSubs(res), error => this.handleError(''), () => this.loaderService.toggleLoader(false));
    }

    fetchSubscribers() {
      const url = this.helperService.getResourceUrl(AlertConstant.SUBSCRIBER_URL_JSON, true);
      this.loaderService.toggleLoader(true);
      this.authHttpRequest(RequestType.GET, url)
        .subscribe(res => this.alertObservablesService.notifySubscriberSubs(res), error => this.handleError(''), () => this.loaderService.toggleLoader(false));
    }

    private handleError(error) {
      this.notificationService.displayError('Alert Service failed', 'Error');
    }
}
