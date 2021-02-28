import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  public isCreate$ = new BehaviorSubject<boolean>(false);

  constructor() { }
}
