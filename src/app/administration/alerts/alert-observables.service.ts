import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertObservablesService {

  private messagesSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  messages$ = this.messagesSubject.asObservable();
  private messageDialogSubject: Subject<any> = new Subject();
  messageDialog$ = this.messageDialogSubject.asObservable();
  private groupSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  groups$ = this.groupSubject.asObservable();
  private groupDialogSubject: Subject<any> = new Subject();
  groupDialog$ = this.groupDialogSubject.asObservable();
  private subscriberSubject: BehaviorSubject<any> = new BehaviorSubject([]);
  subscribers$ = this.subscriberSubject.asObservable();
  private subscriberDialogSubject: Subject<any> = new Subject();
  subscriberDialog$ = this.subscriberDialogSubject.asObservable();

  constructor() { }

  notifyMessagesSubs(val) {
    this.messagesSubject.next(val);
  }

  notifyMessageDialogSubs(val) {
    this.messageDialogSubject.next(val);
  }

  notifyGroupSubs(val) {
    this.groupSubject.next(val);
  }

  notifyGroupDialogSubs(val) {
    this.groupDialogSubject.next(val);
  }

  notifySubscriberSubs(val) {
    this.subscriberSubject.next(val);
  }

  notifySubscriberDialogSubs(val) {
    this.subscriberDialogSubject.next(val);
  }
}
