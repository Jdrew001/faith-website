import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../core/services/helper.service';
import { MinistriesConstants } from './ministries.constants';
import { MinistryContent } from './ministry.model';

@Injectable({
  providedIn: 'root'
})
export class MinistryService {

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) { }

  fetchMinistryContent(): Observable<MinistryContent> {
    const url = this.helperService.getCMSResource(MinistriesConstants.FETCH_MINISTRY_CONTENT);
    return this.http.get(url) as Observable<MinistryContent>;
  }
}
