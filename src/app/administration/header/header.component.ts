import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Store } from '@ngxs/store';
import { TokenState } from 'src/app/shared/store/token/token.state';
import { AdministrationService } from '../administration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userModules = [];
  hasAnnouncement = false;
  hasVisitor = false;
  hasContact = false;
  hasUserManagement = false;
  hasAlerts = false;

  constructor(private authenticationService: AuthenticationService, private router: Router,
              private notificationService: NotificationService, private store: Store,
              private administrationService: AdministrationService) { }

  ngOnInit() {
    this.administrationService.fetchUser$.subscribe(() => {
      this.validateHeadings();
    });
  }

  validateHeadings() {
    this.userModules = this.store.selectSnapshot(TokenState.systemModules);
    if (this.userModules.find(o => o.name === 'Announcement')) {
      this.hasAnnouncement = true;
    } else { this.hasAnnouncement = false; }
    if (this.userModules.find(o => o.name === 'Alerts')) {
      this.hasAlerts = true;
    } else { this.hasAlerts = false; }
    if (this.userModules.find(o => o.name === 'Visitor')) {
      this.hasVisitor = true;
    } else { this.hasVisitor = false; }
    if (this.userModules.find(o => o.name === 'Contact')) {
      this.hasContact = true;
    } else { this.hasContact = false; }
    if (this.userModules.find(o => o.name === 'User_Management')) {
      this.hasUserManagement = true;
    } else {
      this.hasUserManagement = false;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
    this.notificationService.displayError('You are no longer logged in. Please login to continue.', 'Authentication');
  }

}
