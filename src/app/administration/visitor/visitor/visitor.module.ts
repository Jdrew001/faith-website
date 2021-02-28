import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorComponent } from './visitor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VisitorService } from './visitor.service';
import { VisitorDetailsComponent } from './visitor-details/visitor-details.component';
import { VisitorDetailsService } from './visitor-details/VisitorDetailsService';


@NgModule({
  declarations: [
    VisitorComponent,
    VisitorDetailsComponent
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
  providers: [
    VisitorService,
    VisitorDetailsService
  ],
  exports: [
    VisitorComponent,
    VisitorDetailsComponent
  ]
})
export class VisitorModule { }
