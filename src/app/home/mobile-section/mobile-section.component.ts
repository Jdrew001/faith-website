import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeConstants } from '../home.constants';

@Component({
  selector: 'app-mobile-section',
  templateUrl: './mobile-section.component.html',
  styleUrls: ['./mobile-section.component.css']
})
export class MobileSectionComponent implements OnInit {

  imageUrl = '';
  googlePlay = '';
  appStore = '';

  constructor(private helperService: HelperService) { }

  ngOnInit() {
    window.scrollTo({ top: 0});
    this.imageUrl = this.helperService.getResourceUrl(HomeConstants.MOBILE_SECTION_IMAGE, true);
    this.googlePlay = this.helperService.getResourceUrl(HomeConstants.MOBILE_SECTION_GOOGLE, true);
    this.appStore = this.helperService.getResourceUrl(HomeConstants.MOBILE_SECTION_APPLE, true);
  }

}
