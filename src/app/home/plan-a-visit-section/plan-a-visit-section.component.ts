import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeConstants } from '../home.constants';
import { HomeContent } from '../home.model';

@Component({
  selector: 'app-plan-a-visit-section',
  templateUrl: './plan-a-visit-section.component.html',
  styleUrls: ['./plan-a-visit-section.component.css']
})
export class PlanAVisitSectionComponent implements OnInit, OnChanges {

  showMyElement: boolean = false;
  imageUrl = '';
  @Input() homeContent: HomeContent;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    window.scrollTo({ top: 0});
  }

  ngOnChanges(changes) {
    this.imageUrl = !this.homeContent.planVisit.remoteImage ? this.helperService.getResourceUrl(this.homeContent.planVisit.background.url, true) : 
    this.helperService.getCMSResource(this.homeContent.planVisit.background.url);
  }

}
