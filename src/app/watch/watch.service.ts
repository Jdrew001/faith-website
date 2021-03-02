import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../core/services/helper.service';
import { WatchConst } from './watch.constant';
import { WatchContent } from './watch.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) { }

  fetchWatchContent(): Observable<WatchContent> {
    const url = this.helperService.getCMSResource(WatchConst.WATCH_CONTENT_URL);
    return this.http.get(url) as Observable<WatchContent>;
  }
}
