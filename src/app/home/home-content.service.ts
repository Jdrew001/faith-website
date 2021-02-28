import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../core/services/helper.service';
import { HomeConstants } from './home.constants';
import { HomeContent } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeContentService {

  constructor(
    private helperService: HelperService,
    private http: HttpClient) { }

  fetchHomeContent(): Observable<HomeContent> {
    const url = this.helperService.getCMSResource(HomeConstants.HOME_CONTENT_URL);
    return this.http.get(url) as Observable<HomeContent>;
  }
}
