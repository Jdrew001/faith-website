import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { VisitConstant } from './visit-constant';
import { HomeConstants } from '../home/home.constants';
import { VisitContent } from './visit.model';
import { PlanAVisitService } from './plan-a-visit.service';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-plan-a-visit',
  templateUrl: './plan-a-visit.component.html',
  styleUrls: ['./plan-a-visit.component.css']
})
export class PlanAVisitComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  imageUrl = '';
  visitContent = new VisitContent();

  constructor(
    private helperService: HelperService,
    private planAVisitService: PlanAVisitService,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.fetchVisitContent();
  }

  fetchVisitContent() {
    this.planAVisitService.fetchVisitContent().subscribe(res => {
      this.visitContent = res['content'][0];
      this.visitContent.heading.remoteImage = true;
      this.updateImageUrl();
    }, err => {
      this.visitContent.heading.remoteImage = false;
      this.updateImageUrl();
    });
  }

  updateImageUrl() {
    this.imageUrl = this.visitContent.heading.remoteImage ? 
      this.helperService.getCMSResource(this.visitContent.heading.background.url) :
      this.helperService.getResourceUrl(this.visitContent.heading.background.url, true);
  }
}
