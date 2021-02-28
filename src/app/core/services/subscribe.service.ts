import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private changeUrlSource : Subject<string> = new Subject();
  changeUrl$ = this.changeUrlSource.asObservable();

  private changeUrlDataSource : Subject<any> = new Subject();
  changeUrlData$ = this.changeUrlDataSource.asObservable();

  constructor() { }

  urlChanged(url: string) {
    this.changeUrlSource.next(url);
  }

  urlChangeData(data: any) {
    this.changeUrlDataSource.next(data);
  }
}
