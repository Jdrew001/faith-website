import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HelperService } from 'src/app/core/services/helper.service';

@Injectable()
export class SpecialAlertService {

  public specialAlert$: Subject<any> = new Subject<any>();

  constructor(
    private helperService: HelperService,
    private http: HttpClient
  ) { }

  fetchSpecialAnnouncement() {
    const url = this.helperService.getCMSResource('/special-announcement');
    return this.http.get(url);
  }
}
