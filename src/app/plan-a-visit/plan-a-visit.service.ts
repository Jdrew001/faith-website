import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from '../core/services/helper.service';
import { VisitConstant } from './visit-constant';
import { VisitContent } from './visit.model';

@Injectable({
  providedIn: 'root'
})
export class PlanAVisitService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  fetchVisitContent(): Observable<VisitContent> {
    const url = this.helperService.getCMSResource(VisitConstant.VISIT_CONTENT_URL);
    return this.http.get(url) as Observable<VisitContent>;
  }
}
