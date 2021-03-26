import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { MinistriesConstants } from './ministries.constants';

import { Image } from "../shared/models/CMS_Model";
import { MinistryService } from './ministry.service';
import { MinistryContent } from './ministry.model';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  ministryContent = new MinistryContent();

  constructor(
    private helperService: HelperService,
    private ministriesService: MinistryService,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.ministriesService.fetchMinistryContent().subscribe(res => {
      this.ministryContent.ministrySection = res['ministrySection'];
      this.ministryContent.ministrySection.forEach(data => data.remoteImage = true);
    }, err => {
      this.ministryContent.ministrySection.forEach(data => data.remoteImage = false);
    })
  }

  loadImage(obj: {id: number, title: string, description: string, background: Image, remoteImage: boolean}) {
    return obj.remoteImage ? this.helperService.getCMSResource(obj.background.url): this.helperService.getResourceUrl(obj.background.url, true);
  }

}
