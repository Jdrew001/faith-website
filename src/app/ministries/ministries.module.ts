import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinistriesComponent } from './ministries.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MinistriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MinistriesComponent
  ]
})
export class MinistriesModule { }
