import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ConfirmService {

  confirmSubject: Subject<boolean> = new Subject();
  confirm$ = this.confirmSubject.asObservable();

  constructor() { }
}
