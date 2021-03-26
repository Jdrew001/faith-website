import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { ScrollService } from '../shared/scroll.service';
import { AboutConstant } from './about.constant';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutImageUrl: string;
  pastorImageUrl: string;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  constructor(
    private helperService: HelperService,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.aboutImageUrl = this.helperService.getResourceUrl(AboutConstant.ABOUT_IMG_URL, true);
    this.pastorImageUrl = this.helperService.getResourceUrl(AboutConstant.PASTOR_IMG_URL, true);
  }

}
