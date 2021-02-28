import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVisitorComponent } from './add-visitor.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddVisitorService } from './add-visitor.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@NgModule({
  declarations: [
    AddVisitorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AddVisitorService
  ],
  exports: [
    AddVisitorComponent
  ]
})
export class AddVisitorModule { }
