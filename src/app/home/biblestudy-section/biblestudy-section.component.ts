import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeConstants } from '../home.constants';
import { HomeContent } from '../home.model';

@Component({
  selector: 'app-biblestudy-section',
  templateUrl: './biblestudy-section.component.html',
  styleUrls: ['./biblestudy-section.component.css']
})
export class BiblestudySectionComponent implements OnInit, OnChanges {

  showMyElement: boolean = false;
  imageUrl = '';
  @Input() homeContent: HomeContent;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.imageUrl = !this.homeContent.planVisit.remoteImage ? this.helperService.getResourceUrl(this.homeContent.bibleStudy.background.url, true) : 
    this.helperService.getCMSResource(this.homeContent.bibleStudy.background.url);
  }

}
