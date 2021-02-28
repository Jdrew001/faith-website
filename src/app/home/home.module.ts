import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeadingComponent } from './heading/heading.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MinistriesSectionComponent } from './ministries-section/ministries-section.component';
import { BiblestudySectionComponent } from './biblestudy-section/biblestudy-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { IamglobalSectionComponent } from './iamglobal-section/iamglobal-section.component';
import { PlanAVisitSectionComponent } from './plan-a-visit-section/plan-a-visit-section.component';
import { RouterModule } from '@angular/router';
import { MobileSectionComponent } from './mobile-section/mobile-section.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeadingComponent,
    AnnouncementsComponent,
    MinistriesSectionComponent,
    BiblestudySectionComponent,
    AboutSectionComponent,
    IamglobalSectionComponent,
    PlanAVisitSectionComponent,
    MobileSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    HeadingComponent,
    AnnouncementsComponent,
    MinistriesSectionComponent,
    BiblestudySectionComponent,
    AboutSectionComponent,
    IamglobalSectionComponent,
    PlanAVisitSectionComponent,
    MobileSectionComponent
  ]
})
export class HomeModule { }
