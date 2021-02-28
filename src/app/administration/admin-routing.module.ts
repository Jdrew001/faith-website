import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddVisitorComponent } from './visitor/add-visitor/add-visitor.component';
import { AuthenticationGuardService } from '../core/services/authentication-guard.service';
import { VisitorComponent } from './visitor/visitor/visitor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { AdministrationComponent } from './administration.component';
import { VisitorGuardService } from '../core/services/visitor-guard.service';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AlertsComponent } from './alerts/alerts.component';

const routes: Routes = [
  { path: 'administration', redirectTo: '/administration/dashboard', pathMatch: 'full' },
  { path: 'administration', component: AdministrationComponent, canActivate: [AuthenticationGuardService, VisitorGuardService], children: [
    { path: 'visitor', component: VisitorComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'usermanagement', component: UserManagementComponent },
    { path: 'announcement', component: AnnouncementComponent },
    { path: 'alerts', component: AlertsComponent }
  ] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
