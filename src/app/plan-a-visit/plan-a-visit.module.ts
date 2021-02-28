import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanAVisitComponent } from './plan-a-visit.component';
import { SharedModule } from '../shared/shared.module';
import { PlanAVisitService } from './plan-a-visit.service';

@NgModule({
  declarations: [
    PlanAVisitComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    PlanAVisitService
  ],
  exports: [
    PlanAVisitComponent
  ]
})
export class PlanAVisitModule { }
