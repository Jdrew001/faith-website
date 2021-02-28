import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { AnnouncementConstant } from './announcement.constant';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Announcement } from './announcement.model';
import { CoreConstant } from 'src/app/core/core.constant';
import { LogoutAction } from 'src/app/shared/store/token/actions/logout.action';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UploadFile } from 'ng-uikit-pro-standard';
import { ReorderModel } from './announcement-table/a-reorder/a-reorder.model';
import { BaseService, RequestType } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends BaseService {

  dialogSubject: Subject<any> = new Subject();
  dialog$ = this.dialogSubject.asObservable();

  reorderSubject: Subject<any> = new Subject();
  reorderDialog$ = this.reorderSubject.asObservable();

  announcementSaveSubject: Subject<any> = new Subject();
  announcementSave$ = this.announcementSaveSubject.asObservable();

  constructor(private helperService: HelperService, protected store: Store,
    protected httpClient: HttpClient, protected router: Router, protected notificationService: NotificationService) {
      super(notificationService, store, router, httpClient);
    }

  fetchAnnouncements() {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.FETCH_ANNOUNCEMENTS, false);
    return this.authHttpRequest(RequestType.GET, url) as Observable<Announcement[]>;
  }

  fetchAnnouncementByMonth(body) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.FETCH_ANNOUNCEMENT_BY_MONTH, false);
    return this.authHttpRequest(RequestType.POST, url, body);
  }

  fetchAnnouncement(id) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.FETCH_ANNOUNCEMENT + '/' + id, false);
    return this.authHttpRequest(RequestType.GET, url) as Observable<Announcement>;
  }

  addAnnouncement(model: Announcement, file: UploadFile) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.ADD_ANNOUNCEMENT, false);
    let formData = new FormData();
    // formData.append('heading', model.heading);
    // formData.append('description', model.description);
    // formData.append('expirationDate', (model.expirationDate ? model.expirationDate : null));
    // formData.append('month', model.month);
    // formData.append('year', model.year);
    // formData.append('image', file.nativeFile);

    return this.authHttpRequest(RequestType.POST, url, formData, true);
  }

  updateAnnouncement(model: Announcement, file: UploadFile, announcementId: number) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.UPDATE_ANNOUNCEMENT + '/' + announcementId, false);

    let formData = new FormData();
    // formData.append('heading', model.heading);
    // formData.append('description', model.description);
    // formData.append('expirationDate', (model.expirationDate ? model.expirationDate : null));
    // formData.append('month', model.month);
    // formData.append('year', model.year);
    // formData.append('image', file.nativeFile);

    return this.authHttpRequest(RequestType.POST, url, formData, true);
  }

  deleteAnnouncement(id: number) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.DELETE_ANNOUNCEMENT + '/' + id, false);
    return this.authHttpRequest(RequestType.POST, url);
  }

  reorderAnnouncement(body: ReorderModel) {
    const url = this.helperService.getResourceUrl(AnnouncementConstant.REORDER_ANNOUNCEMENT, false);
    return this.authHttpRequest(RequestType.POST, url, body);
  }
}
