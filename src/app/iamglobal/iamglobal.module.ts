import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IamglobalComponent } from './iamglobal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IamglobalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    IamglobalComponent
  ]
})
export class IamglobalModule { }
