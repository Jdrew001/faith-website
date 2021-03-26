import { Component, HostListener, OnInit } from '@angular/core';
import { HelperService } from '../core/services/helper.service';
import { AboutConstant } from '../about/about.constant';
import { ScrollService } from '../shared/scroll.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    this.scrollService.menuService$.next(true);
  } 

  aboutImageUrl: string;

  constructor(
    private helperService: HelperService,
    private scrollService: ScrollService
    ) { }

  ngOnInit() {
    this.aboutImageUrl = this.helperService.getResourceUrl(AboutConstant.ABOUT_IMG_URL, true);
  }

}
