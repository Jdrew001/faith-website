import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { AnnouncementTableComponent } from './announcement-table/announcement-table.component';
import { AnnouncementDetailsComponent } from './announcement-details/announcement-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnouncementService } from './announcement.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AReorderComponent } from './announcement-table/a-reorder/a-reorder.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AnnouncementComponent,
    AnnouncementTableComponent,
    AnnouncementDetailsComponent,
    AReorderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule.forRoot()
  ],
  providers: [
    AnnouncementService
  ],
  exports: [
    AnnouncementComponent,
    AnnouncementTableComponent,
    AnnouncementDetailsComponent
  ]
})
export class AnnouncementModule { }
