import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscribeService } from '../core/services/subscribe.service';
import { isNullOrUndefined } from 'util';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Store } from '@ngxs/store';
import { TokenState } from '../shared/store/token/token.state';
import { FetchUserAction } from '../shared/store/token/actions/fetch-user.action';
import { AdministrationService } from './administration.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  count = 0;

  constructor(private store: Store, private administrationService: AdministrationService, private router: Router) { }

  ngOnInit() {
    this.fetchUserInfo();
    this.validateUserRole();
  }

  validateUserRole() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.fetchUserInfo();
      }
    });
  }

  fetchUserInfo() {
    const email = this.store.selectSnapshot(TokenState.userEmail);
    this.store.dispatch(new FetchUserAction(email)).subscribe(data => {
      this.administrationService.fetchUserSubject.next(true);
    });
  }

}
