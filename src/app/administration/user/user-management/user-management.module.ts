import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserTableComponent } from './user-table/user-table.component';
import { UserKpiComponent } from './user-kpi/user-kpi.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from './user.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserTableComponent,
    UserKpiComponent,
    UserDetailsComponent
  ],
  providers: [
    UserManagementService,
    UserService
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserManagementModule { }
