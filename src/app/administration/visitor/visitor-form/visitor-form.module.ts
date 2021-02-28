import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorFormComponent } from './visitor-form.component';
import { BasicDetailsComponent } from './basic-details/basic-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { FamilyDetailsComponent } from './family-details/family-details.component';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { GreeterDetailsComponent } from './greeter-details/greeter-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisitorFormService } from '../visitor-form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisitorResourceService } from './visitor-resource.service';

@NgModule({
  declarations: [
    VisitorFormComponent,
    BasicDetailsComponent,
    ContactDetailsComponent,
    FamilyDetailsComponent,
    VisitDetailsComponent,
    GreeterDetailsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    VisitorFormService,
    VisitorResourceService
  ],
  exports: [VisitorFormComponent]
})
export class VisitorFormModule { }
