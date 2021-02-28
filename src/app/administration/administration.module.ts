import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AddVisitorModule } from './visitor/add-visitor/add-visitor.module';
import { UserManagementModule } from './user/user-management/user-management.module';
import { AdministrationComponent } from './administration.component';
import { AdministrationService } from './administration.service';
import { VisitorModule } from './visitor/visitor/visitor.module';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBModalService } from 'ng-uikit-pro-standard';
import { CoreModule } from '../core/core.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertTabsComponent } from './alerts/alert-tabs/alert-tabs.component';
import { AlertsModule } from './alerts/alerts.module';
import { VisitorFormModule } from './visitor/visitor-form/visitor-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AdministrationComponent,
    PasswordDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    DashboardModule,
    VisitorModule,
    AdminRoutingModule,
    UserManagementModule,
    AnnouncementModule,
    FormsModule,
    ReactiveFormsModule,
    AlertsModule
  ],
  providers: [
    AdministrationService,
    MDBModalService
  ],
  exports: [
    AdministrationComponent,
    PasswordDialogComponent
  ]
})
export class AdministrationModule { }
