import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HelperService } from 'src/app/core/services/helper.service';
import { HomeConstants } from '../home.constants';
import { HomeContent } from '../home.model';

@Component({
  selector: 'app-iamglobal-section',
  templateUrl: './iamglobal-section.component.html',
  styleUrls: ['./iamglobal-section.component.css']
})
export class IamglobalSectionComponent implements OnInit, OnChanges {

  // tslint:disable-next-line: no-input-rename
  showMyElement: boolean = false;
  showMyElementMobile: boolean = false;
  imageUrl = '';
  @Input() homeContent: HomeContent;

  constructor(private helperService: HelperService) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    this.imageUrl = !this.homeContent.planVisit.remoteImage ? this.helperService.getResourceUrl(this.homeContent.missions.image.url, true) : 
    this.helperService.getCMSResource(this.homeContent.missions.image.url);
  }

}
