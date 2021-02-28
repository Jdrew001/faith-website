import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnnouncementImplConstants } from './announcementImpl-constant';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/administration/announcement/announcement.model';
import { Router } from '@angular/router';
import { CoreConstant } from 'src/app/core/core.constant';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LogoutAction } from 'src/app/shared/store/token/actions/logout.action';
import { BaseService, RequestType } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementImplService extends BaseService {

  constructor(private helperService: HelperService, protected httpClient: HttpClient, protected store: Store,
    protected router: Router, protected notificationService: NotificationService) {
      super(notificationService, store, router, httpClient);
    }

  getAnnouncements() {
    const url = this.helperService.getCMSResource(AnnouncementImplConstants.GET_ANNOUNCEMENT);
    return this.publicHttpRequest(RequestType.GET, url) as any;
  }
}
