import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeConstants } from '../home.constants';
import { HomeContent } from '../home.model';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit, OnChanges {

// tslint:disable-next-line: no-input-rename
  showMyElement: boolean;
  imageUrl = '';
  mobileUrl = '';
  @Input() homeContent: HomeContent;

  constructor(private helperService: HelperService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.imageUrl = !this.homeContent.planVisit.remoteImage ? this.helperService.getResourceUrl(this.homeContent.about.image.url, true) : 
    this.helperService.getCMSResource(this.homeContent.about.image.url);
  }
}
