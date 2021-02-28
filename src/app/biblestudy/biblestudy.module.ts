import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiblestudyComponent } from './biblestudy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BiblestudyComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BiblestudyComponent
  ]
})
export class BiblestudyModule { }
