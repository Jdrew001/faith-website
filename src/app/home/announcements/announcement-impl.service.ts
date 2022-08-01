import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { AnnouncementImplConstants } from './announcementImpl-constant';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementImplService {

  constructor(private helperService: HelperService, protected httpClient: HttpClient,
    protected router: Router, protected notificationService: NotificationService) {
    }

  getAnnouncements() {
    const url = this.helperService.getCMSResource(AnnouncementImplConstants.GET_ANNOUNCEMENT);
    //return this.publicHttpRequest(RequestType.GET, url) as any;
    return this.httpClient.get(url) as any;
  }
}
